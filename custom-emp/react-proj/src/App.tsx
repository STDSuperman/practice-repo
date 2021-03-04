import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { VueWrapper } from "vuera";
import VueHelloWorld from "@v2hw/HelloWorld";
import styled from 'styled-components'
import { Card } from "antd";
const { Meta } = Card;

const AppDiv = styled.div`
  display: flex;
  justify-content: space-around;
`

const ReactContainer = styled.div`
  margin: 10px;
  display: inline-block;
  width: 240px;
  height: 400px;
`

function App() {
	return (
		<AppDiv>
			<ReactContainer>
				<Card
					hoverable
					style={{ width: 240 }}
					cover={
						<img
							alt="example"
							src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
						/>
					}
				>
					<Meta
						title="Hello World!"
						description="我是React组件"
					/>
				</Card>
			</ReactContainer>
			<VueWrapper component={VueHelloWorld}></VueWrapper>
		</AppDiv>
	);
}

export default App;
