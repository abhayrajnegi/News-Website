import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=53c16026773d4bf992000f07fd951f6d&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
  }
  // handleNext = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=53c16026773d4bf992000f07fd951f6d&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     loading: false,
  //   });
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     totalnext: this.state.totalnext + this.props.pageSize,
  //   });
  // };

  // handlePrevious = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=53c16026773d4bf992000f07fd951f6d&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     totalnext: this.state.totalnext - this.props.pageSize,
  //     loading: false,
  //   });
  // };

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=53c16026773d4bf992000f07fd951f6d&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true,
      page:this.state.page+1
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      loading:false
    })
  };

  constructor(props) {
    super(props);
    console.log("hello i am a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-News Pro`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=53c16026773d4bf992000f07fd951f6d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  render() {
    return (
      <div>
          <h3 style={{ margin: "20px" ,marginTop:'80px'}}>
            News Pro - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
            Headlines
          </h3>
          {this.state.loading && <Spinner></Spinner>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        > 
        <div className="container">
          <div className="row">
            {this.state.articles.map((e) => {
                return (
                  <div className="col-md-3 my-3" key={e.url}>
                    <NewsItem
                      title={e.title != null ? e.title.slice(0, 40) : ""}
                      description={
                        e.description != null ? e.description.slice(0, 50) : ""
                      }
                      imageurl={e.urlToImage}
                      newsurl={e.url}
                      author={e.author != null ? e.author : "unknown"}
                      date={e.publishedAt}
                      source={e.source.name}
                    ></NewsItem>
                  </div>
                );
              })}
          </div>
          </div>
          </InfiniteScroll>
      </div>
    );
  }
}

export default News;
