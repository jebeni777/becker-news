import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';



class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;

    try {
      page = Number(query.page) || 1;

      const response = await fetch(
        'https://node-hnapi.herokuapp.com/news?page={page}'
      );
      stories = await response.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }
    return { page, stories };
  }

  render() {
    const { stories, page } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <Layout title="Becker News">
        <StoryList stories={stories} />

        <button>
          <Link href={`/?page=${page + 1}`}>
            <a>Load More</a>
          </Link>
        </button>

        <button>
          <Link href={`/?page=${page - 1}`}>
            <a>Previous</a>
          </Link>
        </button>
        <style jsx>
          {`
            button {
              font-size: 16px;
              font-weight: 300;
            }
            button a {
              text-decoration: none;
            }
          `}
        </style>
      </Layout>
    );
  }
}

export default Index;