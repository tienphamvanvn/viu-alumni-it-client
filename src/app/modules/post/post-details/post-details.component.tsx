import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { getPost } from "@/app/store/post/post.action";
import Layout from "@/app/components/layout";
import Head from "@/app/components/head";
import PostItem from "@/app/components/post/list-posts/post-item";
import Loader from "@/app/components/loader";

const PostDetailsPage: React.FC<PropType> = ({ match }) => {
  const { token } = useSelector(userSelector);
  const { isLoading, posts } = useSelector(postSelector);

  const dispatch = useDispatch<AppDispatch>();

  const { postId } = match.params;

  useEffect(() => {
    token && postId && dispatch(getPost(token, postId));
  }, [dispatch, token, postId]);

  return (
    <Layout>
      <div className="flex flex-col">
        <Head account={null} user={null} studentIDParam="" headline="Post" />
        <div className="flex flex-col relative">
          {isLoading ? (
            <div className="pt-28">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col w-full mx-auto max-w-600px">
              {posts && (
                <>
                  {posts.length > 0 ? (
                    posts.map(post => (
                      <div
                        key={post._id}
                        className="flex flex-col border-b border-gray-100"
                      >
                        <PostItem post={post} isPageDetails />
                      </div>
                    ))
                  ) : (
                    <div className="mt-9 text-center text-4xl font-bold break-words leading-9">
                      <span>No posts found</span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {/* input comment */}
          <div className="input-comment"></div>
          {/* input comment */}
        </div>
      </div>
    </Layout>
  );
};

interface MatchParams {
  postId: string;
}

type PropType = RouteComponentProps<MatchParams>;

const userSelector = (state: GlobalState) => state.user;
const postSelector = (state: GlobalState) => state.post;

export default PostDetailsPage;
