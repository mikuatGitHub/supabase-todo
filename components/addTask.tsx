"use client";
import { supabase } from "@/utils/supabase/supabase";
import { Dispatch, SetStateAction, ReactElement, useState } from "react";
import getData from "./getData";

export default function AddTask(props: {
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>;
}) {
  // タスクのテキストを管理
  const [text, setText] = useState("");

  // 追加ボタン押下で実行するフォーム送信処理
  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // supabaseDBにinsert
      // selectメソッドでデータを選択取得。これにより、挿入データがdataに含められる
      let { data, error } = await supabase
        .from("tasks")
        .insert([{ text: text }])
        .select();

      if (error) {
        console.log(error);
      }

      // TodoListのUI更新
      await getData(props.taskList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-2 py-1"
        placeholder="新しいタスクを入力してください"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2"
      >
        追加
      </button>
    </form>
  );
}
