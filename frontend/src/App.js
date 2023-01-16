import React from 'react';
import {Button, Form, Table} from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { OrderListContext } from './providers/OrderListProvider';
import { PulldownOptions } from './components/PulldownOptions';
import {useNavigate} from 'react-router-dom';
import './App.css';

const App = () => {
  console.log("App Loading...");

  const navigate = useNavigate();
  const { orderList, setOrderList } = useContext(OrderListContext);
  const [productOptions, setProductOptions] = useState([]);
  const [packagingOptions, setPackagingOptions] = useState([]);

  useEffect(()=>{
    console.log("useEffect was called !");
    const options = {
      method:'GET',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      }
    }
    
    fetch('http://localhost:8080/item/products', options)
    .then(response => response.json())
    .then(data => setProductOptions(data));

  }, []);

  const currentDateTime = new Date();
  const currentDate = () => {
    let formattedDate = currentDateTime.getFullYear() + "年" + (currentDateTime.getMonth()+1) + "月" + currentDateTime.getDate() + "日";
    return formattedDate;
  };

  const getOrderer = () => {
    return "山田　太郎";
  }

  const handleSubmitForm = (e) =>{
    e.preventDefault();
    const formData = new FormData(document.getElementById('appForm'));
    var obj = {};
    formData.forEach((value, key) => obj[key] = value);
    productOptions.forEach(p=>{
      if(p.id === Number(obj.product)){

        obj.product = p.name;
      }
    });
    packagingOptions.forEach(p=>{
      if(p.id === Number(obj.shape)){
        obj.shape = p.name;
      }
    });
    const newOrders = [...orderList.orders , obj];

    //console.log(newOrders);
    setOrderList({
      orderPerson: getOrderer(),
      orderDate: currentDate(),
      title: '出　荷　指　示　書　（控）',
      orders: newOrders
    });
    //console.log(obj);
  }

  const handleDeleteLine = (idx) => {
    console.log("delete called :" + idx);
    let curOrders = orderList.orders;
    let newOrders = curOrders.filter((order, index) => (index !== idx));
    setOrderList(orderList=>({...orderList, orders: newOrders}));
    /*
    setOrderList({
      orderPerson: getOrderer(),
      orderDate: currentDate(),
      title: '出　荷　指　示　書　（控）',
      orders: newOrders
    });
    */
  }

  const handleConfirmOrder = (e) =>{
    navigate('/confirm');
  }

  const handleProductSelect = (e) =>{
    console.log("useEffect was called !");
    const options = {
      method:'GET',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      }
    }
    fetch('http://localhost:8080/item/packaging?productId='+e.target.value, options)
    .then(response => response.json())
    .then(data => setPackagingOptions(data));
  }

  return (
    <div className="container">
        <header className="App-header">
          <p>発注フォーム</p>
        </header>
        <div className="Orderer">発注担当者: {getOrderer()}</div>
        <div className="Current-date">{currentDate()}</div>
        <div role="region" className="Order-form">
          <Form id="appForm" onSubmit={handleSubmitForm}>
            <fieldset>
              <div className="row">
              <Form.Group className="col" controlId="fgDeliveryMethod">
                <Form.Label>納入方法</Form.Label>
                <Form.Control name="deliveryMethod" type="text"/>
              </Form.Group>
              <Form.Group className="col" controlId="fgDeliveryDate">
                <Form.Label>納入希望日</Form.Label>
                <Form.Control name="deliveryDate" type="date"/>
              </Form.Group>
              <Form.Group className="col" controlId="fgDeliveryTime">
                <Form.Label>納入希望時間</Form.Label>
                <Form.Control name="deliveryTime" type="time" list="delivery-time-list" min="08:00" max="19:00" step="3600" />
              </Form.Group>
              
              <datalist id="delivery-time-list">
                <option value="08:00"></option>
                <option value="09:00"></option>
                <option value="10:00"></option>
                <option value="11:00"></option>
                <option value="12:00"></option>
                <option value="13:00"></option>
                <option value="14:00"></option>
                <option value="15:00"></option>
                <option value="16:00"></option>
                <option value="17:00"></option>
                <option value="18:00"></option>
                <option value="19:00"></option>
              </datalist>

              </div>
              <div className="row">
              <Form.Group className="col" controlId="fgDeliveryTo">
                <Form.Label>納入先</Form.Label>
                <Form.Control name="deliveryTo" type="text"/>
              </Form.Group>
              <Form.Group className="col" controlId="fgDealer">
                <Form.Label>依頼先（扱い先）</Form.Label>
                <Form.Control name="dealer" requesttype="text"/>
              </Form.Group>
              </div>
              <div className="row">
              <Form.Group className="col" controlId="fgProduct">
                <Form.Label>品種</Form.Label>
                <Form.Select name="product" onChange={handleProductSelect}>
                  <PulldownOptions options={productOptions} />
                </Form.Select>
              </Form.Group>
              <Form.Group className="col" controlId="fgShape">
                <Form.Label>荷姿</Form.Label>
                <Form.Select name="shape">
                  <PulldownOptions options={packagingOptions} />
                </Form.Select>
              </Form.Group>
              <Form.Group className="col" controlId="fgLimitation">
                <Form.Label>限定</Form.Label>
                <Form.Control name="limitation" type="text"/>
              </Form.Group>
              <Form.Group className="col" controlId="fgNet">
                <Form.Label>Net</Form.Label>
                <Form.Control name="net" type="text"/>              
              </Form.Group>
              <Form.Group className="col" controlId="fgAmount">
                <Form.Label>数量(kg)</Form.Label>
                <Form.Control name="amount" type="number"/>
              </Form.Group>
              </div>
              <div className="row">
                <Form.Group className="col" controlId="fgOrderNo">
                  <Form.Label>注文No.</Form.Label>
                  <Form.Control name="orderNo" type="number"/>
                </Form.Group>
                <Form.Group className="col" controlId="fgFixedNo">
                  <Form.Label>整理No.</Form.Label>
                  <Form.Control name="fixedNo" type="number"/>
                </Form.Group>
              </div>
              <Button className="Add-button" variant="primary" type="submit">追加</Button>
              </fieldset>
            </Form>
          </div>
          <div className="OrderList">
            <Table striped bordered hover>
              <thead>
              <tr>
                <th colSpan="5"></th>
                <th colSpan="4">製品</th>
                <th colSpan="4"></th>
              </tr>
              <tr>
                <th>No.</th>
                <th>納入方法</th>
                <th>納入時間</th>
                <th>納入先</th>
                <th>依頼先(扱い先)</th>
                <th>品種</th>
                <th>荷姿</th>
                <th>限定</th>
                <th>NET</th>
                <th>数量</th>
                <th>注文No.</th>
                <th>整理No.</th>
                <th>削除</th>
              </tr>
              </thead>
              <tbody>
                {orderList.orders.map((order, index) => 
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.deliveryMethod}</td>
                    <td>{order.deliveryDate} {order.deliveryTime}</td>
                    <td>{order.deliveryTo}</td>
                    <td>{order.dealer}</td>
                    <td>{order.product}</td>
                    <td>{order.shape}</td>
                    <td>{order.limitation}</td>
                    <td>{order.net}</td>
                    <td>{order.amount}</td>
                    <td>{order.orderNo}</td>
                    <td>{order.fixedNo}</td>
                    <td><Button className="Del-button" variant="secondary" onClick={()=> handleDeleteLine(index) }>削除</Button></td>
                  </tr>  
                )}
              </tbody>
            </Table>
          </div>
          <div>
              <Button className="Add-button" variant="primary" onClick={handleConfirmOrder} disabled={orderList.length === 0}>発注確定画面へ</Button>
          </div>
    </div>
  );
}

export {App};
