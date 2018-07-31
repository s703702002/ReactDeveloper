import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './magaele/core/core.scss';

import {
    IcRcln,
    IntRcln,
    DtmRcln,
    CyRnmb
} from './magaele';


class Demo3 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            selectedData: [],
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.dom = null;
    }
    openMenu () {
        this.setState({ open: true });
    }
    closeMenu (e) {
        if (this.isMouseDown) return;
        this.setState({ open: false });
    }
    handleMouseDown () {
        this.isMouseDown = true;
    }
    handleMouseUp () {
        this.isMouseDown = false;
    }
    render () {
        const showValue = this.state.selectedData.map((v, i) => v.txt);

        return (
            <div className="dtm_rcln_wrap"
                ref={e => { this.dom = e }}
            >
                <IntRcln
                    placeholder="請輸入/選擇目的地"
                    label="我是標題" breakline request
                    onFocus={this.openMenu}
                    onBlur={this.closeMenu}
                    value={showValue}
                    color="blue"
                />
                <DtmRcln
                    onBlur={this.closeMenu}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    open={this.state.open}
                    onChange={data => {
                        this.setState({
                            selectedData: data
                        });
                    }}
                    max={1}
                    selectedData={this.state.selectedData}
                    label="更多目的地，請輸入關鍵字"
                    lineOrder={['out', 'in']}
                    levelKey={['vAbord', 'vLine', 'vCountry', 'vCity']}
                    showOrder1={['_6', '_5', '_7', '_3', '_1', '_4', '_2']}
                    showOrder2={['_TPE_KLU', '_TAO_HCU_MLI', '_TCH_CHA_NTO', '_YLI_CYI_TNN', '_KHH_PIN', '_YLN_HLN_TTT']}
                    disabledData={['_NYC_US', '_SFO_US']}
                    positionDOM={this.dom}
                    removeStringOnMenu="\(.+"
                    noTabItem
                    secItemReadOnly
                    fetchPath="./magaele/dtm_rcln/json/hotelCustomMenu.json"
                    customSourceData={(data) => {
                        let newData = data;
                        newData['vAbord'] = {
                            'out': '國外',
                            'in': '台灣'
                        };
                        newData.vLine = {
                            'out': {
                                '_1': '美洲',
                                '_2': '大洋洲',
                                '_3': '歐洲',
                                '_4': '亞非',
                                '_5': '大陸港澳',
                                '_6': '東北亞',
                                '_7': '東南亞',
                            },
                            'in': {
                                '_TPE_KLU': '北北基',
                                '_TAO_HCU_MLI': '桃竹苗',
                                '_TCH_CHA_NTO': '中彰投',
                                '_YLI_CYI_TNN': '雲嘉南',
                                '_KHH_PIN': '高屏',
                                '_YLN_HLN_TTT': '宜花東離島'
                            }
                        };
                        return newData;
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <IcRcln name="tooladdb" size="x15" />

        <IntRcln placeholder="text some.." color="success"
            onKeyDown={(a, b) => {
                // console.log('keydown', a, b);
            }}
            onKeyPress={(a, b) => {
                // console.log('keypress', a, b);
            }}
            onKeyUp={(a, b) => {
                // console.log('keyup', a, b);
            }}
            onChange={(e, data) => {
                console.log('onChange', e, data);
            }}
            onCompositionStart={(a, b) => {
                console.log('onCompositionStart', a.target, a.type, b);
            }}
            onCompositionUpdate={(a, b) => {
                console.log('onCompositionUpdate', a.target, a.type, b);
            }}
            onCompositionEnd={(a, b) => {
                console.log('onCompositionEnd', a.target, a.type, b);
            }}
            icon={<IcRcln name="tooldate" />}
        />
        <Demo3 />
        <CyRnmb
            mode="doubleWay"
            isShowIcon
            isBorderStyle
            isNight
            isReq
            defaultStartDate="2018/04/03"
            defaultEndDate="2018/04/03"
            minDate="2018/04/03"
            maxDate={moment().add(4, 'months').format('YYYY/MM/DD')}
            activeStartDate="2018/04/24"
            activeEndDate={moment().add(4, 'months').subtract(5, 'day').format('YYYY/MM/DD')}
            labelStartDateText="住房日期"
            labelBackDateText="退房日期"
            onChange={(dateState) => {
                console.log('onChange', dateState);

            }}
        />
    </div>,
    document.getElementById('root')
);