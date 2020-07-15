import React from 'react';
import Link from 'next/link';

class Comments extends React.Component {
    static async getInitialProps({ req, res, query}) {
        let comments;
        let story;
        console.log("this.getInitialProps");
        try {
            story = Number(query.id);
            console.log("story", story);

            const response = await fetch(
                'https://hacker-news.firebaseio.com/v0/item/{story}.json'
            );
            comments = await response.json();
            console.log("comments", comments);
            

        } catch (err) {
            console.log(err);
            comments = [];
        }
        return { story, comments };
    }

    render() {
        const { story, comments } = this.props;
        
        return (
            <Layout title="Becker News">
                {comments}
            </Layout>
        )
    }
    


}

export default Comments;