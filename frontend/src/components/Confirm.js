import React from 'react';
import {Link} from "react-router-dom";
import {Button, Table} from 'react-bootstrap';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { OrderListContext } from '../providers/OrderListProvider';
import 'bootstrap/dist/css/bootstrap.min.css';


const Confirm = () =>{
    const {orderList} = useContext(OrderListContext);
    const navigate = useNavigate();
    const handleOrder = () =>{

        let i = 1;
        let orders = [];
        for(var order of orderList.orders){
            order.no = i++;
            orders.push(order);  
        }
        orderList.orders = orders;
        console.log(JSON.stringify(orderList));
        exchangeJWT();
    }

    const exchangeJWT = () => {
        
        const options = {
            method: 'POST',
            body: JSON.stringify(orderList),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch('http://localhost:8080/createPdf', options)
            .then(response=>response.blob())
            .then(blob=>{
                let anchor = document.createElement("a");
                anchor.href = window.URL.createObjectURL(blob);
                anchor.click();
            })
            .then(()=>{
                navigate('/submitted');
            })
                
    }

    return(
        <div className="container">
            <header className="App-header">
                <p>発注のご確認</p>
            </header>
            <div>以下注文製品をご確認の上、「発注する」ボタンを押してください。</div>
            <div className="OrderList">
                <Table striped bordered hover>
                <thead>
                <tr>
                    <th colSpan="6"></th>
                    <th colSpan="4">製品</th>
                    <th colSpan="3"></th>
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
                    </tr>  
                    )}
                </tbody>
                </Table>
            </div>
          <div>
              <Button className="Add-button" variant="primary" onClick={handleOrder} disabled={orderList.length === 0}>発注する</Button>
          </div>
            <Link to={`/`}>Back to Home</Link>
        </div>
    );
}

export {Confirm};