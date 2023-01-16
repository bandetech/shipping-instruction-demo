package com.adobe.demo.components;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class MyPdfUtil {
    
    private Path tempDir;
    
    public Path getTempDir() {
        return tempDir;
    }

    public void setTempDir(Path tempDir) {
        this.tempDir = tempDir;
    }

    @PostConstruct
    public void initAFterStartup(){
        try{
            Path tmpDir = Files.createTempDirectory("AdobePDF");
            if(tmpDir != null){
                log.info("Temp Directory: {}", tmpDir.toString());
            } else {
                log.error("Temp Directory was null !!");
            }
            setTempDir(tmpDir);
        } catch(IOException ex){
            log.error("Cannot create temp directory", ex);
        }
    }

    @PreDestroy
    public void cleanupBeforeExit(){
        log.info("Clean up was called in PyPdfUtil");
    }
}
