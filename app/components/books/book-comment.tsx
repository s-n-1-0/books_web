import { useState } from "react";

type Props = {
  comment: string;
  onChange: (newValue: string) => void;
};
function BookComment({ comment, onChange }: Props) {
  let [isEditing, setIsEditing] = useState(false);
  if (!isEditing && comment == "")
    return (
      <div className="text-center">
        <span
          className="underline cursor-pointer"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          この本にコメントを残す
        </span>
      </div>
    );
  if (!isEditing)
    return (
      <div className="">
        <div
          className=" lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          title="Woman holding a mug"
        ></div>
        <div className="border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              コメント
              <span className="font-bold text-secondary">
                (
                <u
                  className="cursor-pointer"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  編集
                </u>{" "}
                /{" "}
                <u
                  className="cursor-pointer"
                  onClick={() => {
                    onChange("");
                    setIsEditing(true);
                  }}
                >
                  新しくコメントする
                </u>
                )
              </span>
            </p>
            {(() => {
              let lines = comment.split("\n");
              if (lines.length > 1)
                return (
                  <div>
                    {" "}
                    <div className="text-gray-900 font-bold text-xl my-2">
                      {lines[0]}
                    </div>
                    <p className="text-gray-700 text-base">
                      {lines.slice(1).join("\n")}
                    </p>
                  </div>
                );
              return <p className="text-gray-700 text-base">{comment}</p>;
            })()}
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        コメント
        <small className="ml-2">
          コメントが2行以上の場合、1行目がタイトルとして表示されます。
        </small>
      </label>
      <textarea
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="この本は..."
        value={comment}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      ></textarea>
    </div>
  );
}

export default BookComment;
