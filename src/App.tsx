
import './App.css';
import React, {Component} from "react";
import {Button} from './components/Button';
import {Search} from "./components/Search";
import {Image} from "./components/Image";

type AppState = {
    results: any[],
    isLoaded: boolean,
    value: string,
    searchValue: any[],
    searchRes: any[],
    isCurrent: boolean,
    error: string,
    visible: boolean
}

class App extends Component<{}, AppState > {

    state = {
        results: [],
        isLoaded: false,
        value: "",
        searchValue: [],
        searchRes: [],
        isCurrent: true,
        error: "",
        visible: false
    }

    fetching(tag: string) {
        fetch(`https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${tag}`)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.setData(response)
                this.setState({isLoaded: true})
            })
            .catch(err => {
                this.setState({error: err})
            })
    }

    setData(result: any) {

        const { data, meta } = result
        const { results, value} = this.state;

        const newArr = {...data}

        newArr.value = value

        // @ts-ignore
        const newData = results.concat([newArr]);

        this.setState({results: newData})
        this.setState({searchRes: newData})

    }

    setSearch(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({value: event.target.value})
    }

    onSubmit = (event: React.MouseEvent) => {
        const { value, searchValue, results } = this.state

        // @ts-ignore
        const newSearchValue = searchValue.concat( [value] )

        this.setState({searchValue: newSearchValue})
        // console.log(searchValue)

        this.fetching(value)
        event.preventDefault();
    }

    onClearResults = () => {
        const { results, value } = this.state
        this.setState({results: [], value: ""})
    }

    onChangeFilter = () => {
        const { results, isLoaded, searchValue, value } = this.state
        let newArg  = []

        newArg = [...results].sort(function (value: any, searchValue: any) {
            console.log(value.value)
            console.log(searchValue.value)

            if(value.value < searchValue.value){
                return -1
            }
            if (value.value > searchValue.value)
                return 1
            return 0

        })

        this.setState({results: newArg})
        this.setState({isCurrent: false})
        this.setState({visible: false})
    }


    returnChangeFilter = () => {
        const {searchRes} = this.state

        this.setState({results: searchRes})
        this.setState({isCurrent: true})
    }

    isValid = (value: string) => value && true

    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = this.state
        this.setSearch(event)
    }

    errorMessage = () => {
        const {value} = this.state
        if(!this.isValid(value)){
            return (
                <span className={"error-message"}>Заполните поле</span>
            )
        }
    }

    onClickImage = (elem: any, indexArr: number) => {
        const { searchValue } = this.state
        console.log(indexArr)
        searchValue.forEach( (el, index) => {
            console.log(el)
            if(el === elem) this.setState({visible: true})
            if(el !== elem) this.setState({visible: false})
        })
    }

    render() {

        const { results, isLoaded, isCurrent, value, error, visible } = this.state

        return (
            <div className="App">

                <Search
                    type={"text"}
                    onChange={this.onChangeInput}
                    value={value}
                >
                    {this.errorMessage()}
                </Search>

                <div className={"button-container"}>
                    <Button onClick={this.onSubmit} disabled={!this.isValid(value)}>
                        Загрузить
                    </Button>

                    <Button onClick={this.onClearResults}>
                        Очистить
                    </Button>

                    <Button onClick={!isCurrent ? this.returnChangeFilter : this.onChangeFilter}>
                        {!isCurrent ? "Разгруппировать" : "Группировать"}
                    </Button>
                </div>

                {error ?
                    <p>Произошла http ошибка</p>
                    :
                    <div className={"image-container"}>
                        {isLoaded && results.map( (el: any, index) => (
                            <div className={"container__elem"}>
                                <p>{!isCurrent && el.value}</p>
                                {visible && <p>{el.value}</p>}
                                <Image
                                    onClick={() => this.onClickImage(el.value, index)}
                                    className={"container__elem_image"}
                                    key={el.id}
                                    src={el.image_url}
                                />
                            </div>
                        ))}
                    </div>
                }

            </div>
        );
    }
}

export default App;
