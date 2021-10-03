import React, { useState } from "react";
import ButtonReadMore from "@/app/components/button/button-read-more";
import draftToHtml from "draftjs-to-html";
import "@@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./post-content.component.css";

const PostContent: React.FC<PropType> = ({ content }) => {
  const [isReadMore, setReadMore] = useState<boolean>(true);

  const toggleReadMore = () => setReadMore(!isReadMore);

  const blocks = JSON.parse(content.toString()).blocks;

  const cont = blocks
    .map(
      (block: { text: string }) => (!block.text.trim() && "\n") || block.text
    )
    .join("\n");

  const htmlContent = draftToHtml(JSON.parse(content));

  return cont.length > 1 ? (
    <div className="flex flex-col">
      <div className="flex flex-col mt-3">
        {isReadMore && htmlContent.length > 500 ? (
          <div
            className="post-content break-words break-all"
            dangerouslySetInnerHTML={{
              __html: htmlContent.slice(0, 500) + "....",
            }}
          ></div>
        ) : (
          <div
            className="post-content break-words break-all"
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
          ></div>
        )}
        {htmlContent.length > 500 && (
          <ButtonReadMore isReadMore={isReadMore} onClick={toggleReadMore} />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

type PropType = {
  content: string;
};

export default PostContent;
