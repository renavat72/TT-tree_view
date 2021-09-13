import { FC, useState, useEffect } from "react";
import { DataItem, TreeNode } from "../types";

const List: FC<TreeNode> = ({ el, searchQuery, tree }) => {
  const Result: FC<TreeNode> = ({ item }) => {
    const [showResults, setShowResults] = useState<boolean>();
    useEffect(() => {
      if (searchQuery.length >= 1) {
        setShowResults(true);
      }
    }, []);
    const ShowMainTrue: FC = () => {
      console.log(tree[item]);
      return tree[item].map((node: DataItem) => node.main === true)
        ? tree[item]
            .filter((node: DataItem) => node.main === true)
            .map(
              (
                i: DataItem // Если в item флаг main = true, то вывовид его в двух экземплярах
              ) => <li key={i._id}>{i.title} (main: true)</li>
            )
            .slice(0, 2)
        : tree[item].every((node: DataItem) => node.main === true) &&
            tree.slice(0, 4).map(
              (
                i: DataItem // Если в item флаг main = false, то вывовид его в 5 экземплярах
              ) => <li key={i._id}>{i.title} (main: false)</li>
            );
    };
    const ShowAll: FC = () =>
      tree[item].sort().map(
        (
          node: DataItem // Выводит весь массив данных
        ) => (
          <li key={node._id}>
            {node.title} (main:
            {node.main ? "true" : "false"})
          </li>
        )
      );
    return tree[item].length >= 1 ? (
      <ul>
        {showResults ? <ShowAll /> : <ShowMainTrue />}
        {tree[item].length > 1 ? (
          <div
            className="ResultMoreBtn"
            onClick={() => setShowResults(!showResults)}
          >
            ...
          </div>
        ) : null}
      </ul>
    ) : null;
  };
  console.log(el);
  return (
    <div>
      <b>
        {el.toUpperCase()}: ({tree[el].length}){" "}
      </b>
      <div className="Result">
        <Result item={el} />
      </div>
    </div>
  );
};

export default List;
