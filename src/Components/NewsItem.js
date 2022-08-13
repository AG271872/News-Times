import React from 'react'

const NewsItem = (props) =>  {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    const emptyDescription = ' '.repeat(88)
    return (
      <div className='my-5'>
        <div className="card mx-5" style={{border: '3px solid black', minHeight: '80%'}}>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>
            <span className="badge rounded-pill" style={{backgroundColor: 'red'}}> {source}</span>
          </div>
          <img
            style={{ height: '200px' }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = "https://getassist.net/wp-content/uploads/2020/04/Internet-The-Best-Source-of-News.jpg"
            }}
            src={imageUrl ? imageUrl : "https://getassist.net/wp-content/uploads/2020/04/Internet-The-Best-Source-of-News.jpg"} alt="..."
          />
          <div className="card-body">

            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description!==emptyDescription ? `${description}...` : ' '.repeat(88)}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm text-info fw-bold" style={{backgroundColor: '#000203'}}>Read More</a>
          </div>
        </div>
      </div>
    )
 
}

export default NewsItem
