import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';

class Index extends React.Component {
  static async getInitialProps() {
    let stories;

    try {
      const response = await fetch(
        'https://node-hnapi.herokuapp.com/news?page=1'
      );
      stories = await response.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }
    return { stories };
  }

  render() {
    const { stories } = this.props;
    return (
      <div>
        <h1>Welcome to Becker News</h1>
        <div>
          {stories.map(story => (
            <h3 key={story.id}>{story.title}</h3>
          ))}
        </div>
      </div>
    );
  }
}

export default Index;




// import Header from './layouts/Header';

// const Index = () => (
//   <>
//     <Header />

//     <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <h1></h1>

//     </main>
//   </>
// )