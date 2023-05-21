

import TodoItem from "@/components/ServerComponent";
import React, { Suspense } from "react";
import AddtodosForm from "./AddtodosForm";
import Todos from "./todos";
// import Form from "./addTodoForm";
// import Todos from "./todos";




const Page = async () => {

  return (
    <div className="container">
      <AddtodosForm></AddtodosForm>
      <section className="todosContainer" >

        <Suspense fallback={<div>loading...</div>}>
          <Todos />
        </Suspense>
      </section>
    </div>
  );
};

export default Page;
