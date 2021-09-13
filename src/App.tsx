import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import List from "./components/DataList";
import { useTypeSelector } from "./hooks/useTypedSelector";
import { fetchData } from "./store/action-creators";
import { TreeNode } from "./types";

const App: FC = () => {
  const { data, loading } = useTypeSelector((state) => state.data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<boolean>();
  const dispatch = useDispatch();
  const tree: TreeNode[] = [];
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const searchResult = data.filter((i: TreeNode) =>
    i.title.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Поиск данных через input

  searchResult.forEach(
    (el: TreeNode) =>
      tree[el.title[0].toLowerCase()]
        ? tree[el.title[0].toLowerCase()].push(el)
        : (tree[el.title[0].toLowerCase()] = [el]) // Сортируем обьект массива по буквам
  );

  const handleSort = () => {
    if (selectedSort) {
      return tree.sort((a, b) => b.localeCompare(a));
    }
    return tree.sort((a, b) => a.localeCompare(b)); // Сортируем A-Z || Z-A
  };
  handleSort();

  const sortdeArray = Object.keys(tree); // Получаем ключи обьекта массива

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <div className="Wrapper">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSelectedSort(!true)}>(A-Z)</button>
        <button onClick={() => setSelectedSort(!false)}>(Z-A)</button>
        {sortdeArray.map((el) => (
          <List el={el} key={el} searchQuery={searchQuery} tree={tree} />
        ))}
      </div>
    </div>
  );
};
export default App;
