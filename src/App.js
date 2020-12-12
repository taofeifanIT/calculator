import './App.css';
import title from './asset/title.png'
import logo from  './asset/logo.svg'
import people from  './asset/people.svg'
import area from './asset/area.svg'
import React, {useState} from 'react'

function getConversionPeople(peopleNum, areaNum) {
    let conversionPeople = 0; // 折算人数
    const perCapitaArea = areaNum/peopleNum;
    if (perCapitaArea > 8){
        conversionPeople = Math.ceil(areaNum/8)
    } else if (perCapitaArea <= 8) {
        conversionPeople = peopleNum
    }
    return conversionPeople
}

function getCharge(conversionPeople){
    let chargeValue = "";
    let calcConversionPeople = conversionPeople * 1.2;
    if (conversionPeople <= 10){
        chargeValue = "soho"
    } else if (calcConversionPeople <=20 && calcConversionPeople >=11) {
        chargeValue = "10-20"
    } else if (calcConversionPeople <=35 && calcConversionPeople >=21) {
        chargeValue = "21-35"
    } else if (calcConversionPeople <=85 && calcConversionPeople >=36) {
        chargeValue = "36-85"
    } else if (calcConversionPeople <=150 && calcConversionPeople >=86) {
        chargeValue = "86-150"
    } else if (calcConversionPeople > 150) {
        chargeValue = "error"
    }
    return chargeValue
}
function getMonthlyFeeValue(chargeValue, conversionPeople) {
    let monthlyFeeValue = 0;
    let errorNum = 0;
    switch (chargeValue) {
        case 'soho':
            monthlyFeeValue = 499;
            break;
        case '10-20':
            monthlyFeeValue = conversionPeople * 1.2 * 99;
            break;
        case '21-35':
            monthlyFeeValue = conversionPeople * 1.2 * 69;
            break;
        case '36-85':
            monthlyFeeValue = conversionPeople * 1.2 * 59;
            break;
        case '86-150':
            monthlyFeeValue = conversionPeople * 1.2 * 39;
            break;
        case 'error':
            errorNum = 1;
            break;
        default:
            errorNum = 1;
            break;
    }
    if (errorNum){
        return '请联系我们'
    } else {
        return monthlyFeeValue
    }
}
function getConstructionCost(chargeValue) {
    let errorNum = 0;
    let constructionCost = 0;
    switch (chargeValue) {
        case 'soho':
            constructionCost = 1999;
            break;
        case '10-20':
            constructionCost = 2940;
            break;
        case '21-35':
            constructionCost = 12600;
            break;
        case '36-85':
            constructionCost = 20400;
            break;
        case '86-150':
            constructionCost = 36000;
            break;
        case 'error':
            errorNum = 1;
            break;
        default:
            errorNum = 1;
            break;
    }
    if (errorNum){
        return '请联系我们'
    } else {
        return constructionCost
    }
}

function App() {
  const [peopleNum, setPeopleNum] = useState(0);
  const [areaNum, setAreaNum] = useState(0);
  const [monthValue, setMonthValue] = useState(0);
  const [constructionValue, setConstructionValue] = useState(0);
  const calculator = () => {
      const conversionPeople = getConversionPeople(peopleNum, areaNum); // 折算人数
      const chargeValue = getCharge(conversionPeople);
      const MonthlyFee = getMonthlyFeeValue(chargeValue, conversionPeople);
      const constructionCost = getConstructionCost(chargeValue);
      setMonthValue(MonthlyFee);
      setConstructionValue(constructionCost)
  };
  return (
    <div className="App">
      <img className="topLogo" src={logo} alt={''}/>
      <img className="title" src={title} alt={''}/>
      <div className="can">
            <Form>
                <div className="canRow">
                    <div className="lableCan first">
                        <img src={people} alt={""}/>
                        <span>人数</span>
                    </div>
                    <div className="inputCan first">
                        <p>
                            <input value={peopleNum ? peopleNum : ""} placeholder="输入..." onChange={(e) => {
                                if (!isNaN(e.target.value)){
                                    setPeopleNum(e.target.value)
                                } else {
                                    return false
                                }
                            }} />
                            <span>位</span>
                        </p>
                    </div>
                </div>
                <div className="canRow">
                    <div className="lableCan">
                        <img src={area} alt={""}/>
                        <span>面积</span>
                    </div>
                    <div className="inputCan">
                        <p>
                            <input value={areaNum ? areaNum : ""} placeholder="输入..." onChange={(e) => {
                                if (!isNaN(e.target.value)){
                                    setAreaNum(e.target.value)
                                } else {
                                    return false
                                }
                            }}/>
                            <span>平方</span>
                        </p>
                    </div>
                </div>
            </Form>
            <Form>
                <span className="lastPrice">总价:</span>
                <div className="lastPriceInputCan">
                    <div>
                        <label>￥</label><input value={monthValue ? monthValue : ""}  onChange={(e) => {
                            return typeof e.target.value === 'number' && !isNaN(e.target.value);
                    }} />
                    </div>
                    <span>额外收取:首次施工费：{constructionValue}</span>
                </div>
            </Form>
          <div className="contactInformation">联系方式：siyi@networkprovide.com</div>
          <div>
              <button onClick={() => calculator()}>计算</button>
          </div>
      </div>
    </div>
  );
}

function Form(props) {
    return (<div className={'formCan'}>
        {props.children}
    </div>)
}

export default App;
