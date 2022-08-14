import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from 'react-router-dom';

const News = (props) => {

  const { query } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [resultsText, setResultsText] = useState('')

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = query === undefined ? `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}` : `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setResultsText(`Total Results: ${parsedData.totalResults}`)
    setPage(page+1)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News Times`
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    const url = query === undefined ? `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}` : `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

  return (
    <>
      {query === undefined ? <h1 className="text-center" style={{ margin: "10px 0px", marginTop: "90px", color: 'black'}}>Top {capitalizeFirstLetter(props.category)} Headlines</h1> 
      : articles.length === 0 ? <h1 className="text-center" style={{ margin: "10px 0px", marginTop: "90px", color: 'black'}}>No Search Results found for {capitalizeFirstLetter(query)}</h1> 
      : <h1 className="text-center" style={{ margin: "10px 0px", marginTop: "90px", color: 'black'}}>Top Headlines for {capitalizeFirstLetter(query)}</h1>}
      <p className='text-center my-1'>{resultsText}</p>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length+1 < totalResults}
        loader={articles.length === 0 ? <></> : <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, _id) => {
              return <div className="col-md-4" key={_id}>
                <NewsItem title={element.title.slice(0, 55)} description={element.description ? element.description.slice(0, 88) : ''} imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'General',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
