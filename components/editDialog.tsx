// タスクの「編集」ボタンを押したときに表示する編集ダイアログと、Supabaseのデータ更新処理を行う

import { supabase } from "@/utils/supabase/supabase";
import { Dispatch, SetStateAction, ReactElement, useState } from "react";
import getData from "./getData";

export default function EditDialog(props: {
  id: number;
  showModal: Dispatch<SetStateAction<boolean>>;
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>;
}) {
  // モーダル表示ON/OFF状態管理
  const { showModal, taskList } = props;
  // 新タスクを管理
  const [text, setText] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    showModal(false);
    
    try {
      // supabaseの更新処理updateメソッドは指定したデータでテーブルのレコードを更新。textフィールドを新しい値（text変数の値）に更新。
      // eqメソッドは条件一致するレコードをフィルタリング。idフィールドがprops.idと等しいレコードを対象とする。この条件に一致するレコードのみ更新される。
      // selectでdataに格納して返す
      const { data, error } = await supabase
        .from("tasks")
        .update({ text: text })
        .eq("id", props.id)
        .select();

      if (error) {
        console.log(error);
      }

      // UI表示更新
      await getData(taskList);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen bg-black-rgba pt-28">
      <div className="m-auto relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              タスクの編集
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
              onClick={() => showModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">モーダルを閉じる</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  name="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
