package com.adobe.demo.controllers;

import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.adobe.demo.components.MyPdfUtil;
import com.adobe.demo.models.OrderList;
import com.adobe.pdfservices.operation.ExecutionContext;
import com.adobe.pdfservices.operation.auth.Credentials;
import com.adobe.pdfservices.operation.io.FileRef;
import com.adobe.pdfservices.operation.pdfops.DocumentMergeOperation;
import com.adobe.pdfservices.operation.pdfops.options.documentmerge.DocumentMergeOptions;
import com.adobe.pdfservices.operation.pdfops.options.documentmerge.OutputFormat;

import com.fasterxml.jackson.core.json.JsonWriteFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.extern.slf4j.Slf4j;
import lombok.Cleanup;

@Slf4j
@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class ShippingInstructionController {
    
    private static boolean ENABLE_PDF_GENERATION = true;

    @Autowired
    MyPdfUtil pdfUtil;

    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/createPdf", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Resource> createPdf(@RequestBody OrderList orders) throws Exception{
    
        @Cleanup OutputStream out = null;
        //FileLocation fileLocation = new FileLocation();

        Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                .fromFile("pdfservices-api-credentials.json")
                .build();
        if(credentials != null){
            log.info("Got credentials!");
        }

        // Create json from form data
        ObjectMapper mapper = new ObjectMapper();

        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.configure(JsonWriteFeature.ESCAPE_NON_ASCII.mappedFeature(), true);
        String encodedJson = mapper.writeValueAsString(orders);

        //JSONArray  jsonArray = new JSONArray ();
        JSONObject jsonObj = new JSONObject(encodedJson);

        log.info("JSON :{}", jsonObj);

        // Create execution context
        ExecutionContext executionContext = ExecutionContext.create(credentials);
        
        DocumentMergeOptions documentMergeOptions = new DocumentMergeOptions(jsonObj, OutputFormat.PDF);
        DocumentMergeOperation documentMergeOperation = DocumentMergeOperation.createNew(documentMergeOptions);

        FileRef documentTemplate = FileRef.createFromLocalFile("src/main/resources/OrderInspectionTemplate.docx");
        documentMergeOperation.setInput(documentTemplate);

        // prepare store file location
        Path tmpDir = pdfUtil.getTempDir();
        Path tempFile = Files.createTempFile(tmpDir, "gen-", ".pdf");
        log.info("Temp File: {}", tempFile);

        // Execute embeded pdf generation
        if(ENABLE_PDF_GENERATION){
            FileRef result = documentMergeOperation.execute(executionContext);
            out = Files.newOutputStream(tempFile);
            result.saveAs(out);
            out.flush();
            //out.close();
        }
        
        Resource resource = new PathResource(tempFile);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
        
    }
}
