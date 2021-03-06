import React, { Component } from 'react';
import { SearchBar, Toast } from 'antd-mobile';
import { HeaderFix, TodayInformationWrapper, IconFont, Border, BlankWrapper, More } from './style';
import axios from 'axios';
import getJQ from '@/utils/getJQ';
import getArrayItems from '@/utils/getArrayItems';
import { getSituationList, getSituationDetail, getIngredient, searchRecipes } from '@/api/searchApi';
// import { getRecipesById } from '@/api/recipesApi';
import LazyLoad from 'react-lazyload';

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            weatherList: {},
            situationList: [],
            searchContent: '',
            recipesList: []
         }
    }
    render() { 
        let { weatherList, searchContent, recipesList } = this.state;
        return ( 
            <div>
                <HeaderFix>
                    <SearchBar 
                        placeholder="搜索 吃什么 场景"
                        cancelText=" "
                        value={searchContent}
                        onChange={(val) => {
                            this.setState({
                                searchContent: val
                            })
                        }}
                    />
                    <div className='searchButton' onClick={() => {this.getSearchDetail(searchContent)}}>搜索</div>
                </HeaderFix>
                <Border/>
                <TodayInformationWrapper>
                    <div className='title'>
                        <IconFont className='iconfont'>&#xe72d;</IconFont>
                        <p>今天吃什么</p>
                    </div>
                    <div className='weather'>
                        <span>{weatherList.city}</span>
                        <span>{weatherList.date}</span>
                        <span>{weatherList.solarTerm}</span>
                        <span>{weatherList.min}~{weatherList.max}℃</span>
                        <span>{weatherList.desc}</span>
                        <span>{weatherList.brf}</span>
                    </div>
                    <div className='recommend'>
                        {
                            recipesList && recipesList.map((item, index) => {
                                return (
                                    <div className='recipes' key={index}>
                                        { item.videoUrl ? 
                                            <video 
                                                onClick={this.getRecipesDetail(item._id)}
                                                src={item.videoUrl} 
                                                controls="controls" 
                                            >
                                                您的浏览器不支持 video 标签。
                                            </video> : 
                                            <img 
                                                src={item.album[0].url.substring(0, 4) === 'http' ? item.album[0].url : require('@/' + item.album[0].url)} 
                                                onClick={this.getRecipesDetail(item._id)} 
                                                alt=""/> 
                                        }
                                        <p onClick={this.getRecipesDetail(item._id)}>{item.recipeName}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </TodayInformationWrapper>
                {
                    this.state.situationList.map((item, index) => {
                        return (
                            <div key={index}>
                                <BlankWrapper/>
                                <TodayInformationWrapper>
                                    <div className='title'>
                                        <IconFont className='iconfont' dangerouslySetInnerHTML={{__html: item.icon}}/>
                                        <p>{item.type}</p>
                                    </div>
                                    <div className='recommend'>
                                        {
                                            item.list.map((val, i) => {
                                                return (
                                                    <div className='recipes' key={i} onClick={() => {this.getSituationDetail(val.name)}}>
                                                        <LazyLoad offset={100} height={100}>
                                                            <img src={require('@/' + val.img)} className={item.type.length === 5 ? 'season' : ''}/>
                                                        </LazyLoad>
                                                        <p>{val.name}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </TodayInformationWrapper>
                            </div>
                        )
                    })
                }
                <More> - 更多丰富场景尽情期待 - </More>
            </div>
        );
    }

    getRecipesDetail = (recipeId) => () => {
        this.props.history.push({
            pathname: '/recipesDetail/' + recipeId,
            type: 'look'
        })
    }

    getTodayDetail(solarTerm) {
        getSituationDetail({name: solarTerm}).then(res => {
            if (res.data.code === 200) {
                let situationDetail = res.data.data;
                if (situationDetail) {
                    let recipesList = [];

                    searchRecipes({searchContent: JSON.stringify(situationDetail.ingredients), type: 0}).then(res => {
                        if (res.data.code === 200) {
                            recipesList = getArrayItems(res.data.data, 5);
                            recipesList.forEach(item => {
                                if (item.album[0].url.substring(0, 13) === 'statics/video') {
                                    item.videoUrl = require('@/' + item.album[0].url)
                                }
                            })
                            this.setState({
                                recipesList: recipesList
                            })
                        } else {
                            Toast.fail('未知错误', 1);
                        }
                    }).catch(err => {
                        console.log('err', err);
                    })
                }
            }
        }).catch(function (err) {
            Toast.fail('未知错误', 1);
        })
    }

    getSearchDetail(searchContent) {
        getIngredient({name: searchContent}).then(res => {
            if (res.data.code === 200) {
                let ingredient = res.data.data;
                if (!ingredient) {
                    this.getSituationDetail(searchContent)
                } else {
                    this.getIngredientDetail(ingredient);
                }
            } else {
                Toast.fail('未知错误', 1);
            }
        }).catch(err => {
            console.log('err', err);
        })
    }

    getSituationDetail(name) {
        this.props.history.replace({
            pathname: '/situationDetail',
            name: name
        })
    }

    getIngredientDetail(ingredient) {
        this.props.history.replace({
            pathname: '/ingredientDetail',
            ingredientDetail: ingredient
        })
    }

    componentDidMount() {
        getSituationList().then(res => {
            this.setState({
                situationList: res.data.data
            })
        })

        var BMap = window.BMap; //取出window中的BMap对象
        var myCity = new BMap.LocalCity();
        console.log('myCity', myCity);
        let weatherList = {};
        let that = this;
        myCity.get(function (result) {
            result.name = '杭州'
            if (result.name) {
                /*通过当前位置城市信息获取天气*/
                axios.get('https://free-api.heweather.net/s6/weather?', {
                    params: {
                        location: result.name,
                        key: 'f50fe752261144f8858b5e5b6a5cc561'
                    }
                }).then(function (res) {
                    let weatherInfo = res.data.HeWeather6[0];
                    let dateData = weatherInfo.daily_forecast[0].date.split('-');
                    let solarTerm = getJQ(dateData[0], +dateData[1], +dateData[2]);
                    weatherList = {
                        city: weatherInfo.basic.location,
                        min: weatherInfo.daily_forecast[0].tmp_min,
                        max: weatherInfo.daily_forecast[0].tmp_max,
                        desc: weatherInfo.daily_forecast[0].cond_txt_d,
                        brf: weatherInfo.lifestyle[1].brf,
                        date: `${+dateData[1]}月${+dateData[2]}日`,
                        solarTerm: solarTerm
                    }
                    that.setState({
                        weatherList: weatherList
                    })
                    that.getTodayDetail(solarTerm)
                    // console.log(weatherInfo);
                });
            }
        });
    }
}
 
export default Information;