import { useEffect, useState } from 'react';
import './App.css';
import SuggestionList from './SuggestionList';

function App() {

  const [entry, setEntry] = useState('');
  const [suggestions, setSuggestions] = useState(data.toSorted((a, b) => a.name.localeCompare(b.name)))
  const [selected, setSelected] = useState([])
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false)

  useEffect(() => {
    const inputElement = document.getElementById('searchable-input');
    document.addEventListener(('click'), (event) => setIsSuggestionsVisible(inputElement.contains(event.target)));
  }, [])

  const handleOnChange = (val) => {
    const suggestions = data.filter(item => {
      return !item.selected && (item.name.includes(val) || item.email.includes(val));
    })
    setSuggestions(suggestions)
    setEntry(val)
  }

  const handleItemSelect = (item) => {
    item.selected = true;
    setSelected(selected => [...selected, item]);
    handleOnChange('')
  }

  const removeSelectedItem = (removedItem) => {
    removedItem.selected = false;
    const newSelected = selected.filter(item => item.id != removedItem.id);
    setSelected(newSelected)
    setSuggestions(suggestions => [...suggestions, removedItem].toSorted((a, b) => a.name.localeCompare(b.name)))
  }

  const removeLastSelectedItem = (event) => {
    if(entry !== '' || selected.length == 0) return;
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
      removeSelectedItem(selected[selected.length - 1])
    }
  }

  const renderSelectedItems = () => (
    <div className='selected-items'>
      {selected.map(item =>
        <div className='selected-item'>
          <img src={item.thumbnail} className='thumbnail-selected' />
          <div className='name-selected' title={item.name}>{item.name}</div>
          <img
            src="assets/cross.png"
            className='thumbnail-selected cross'
            onClick={() => removeSelectedItem(item)}
          />
        </div>
      )}
    </div>
  )

  return (
    <div className="App">
      <div className="input-chip">
        {renderSelectedItems()}
        <div id='searchable-input' onFocus={() => setIsSuggestionsVisible(true)}>
          <input
            className='input'
            placeholder={selected.length > 0 ? '' : 'Enter email'}
            value={entry}
            onChange={(e) => handleOnChange(e.target.value)}
            onKeyDown={removeLastSelectedItem}
          />
          <SuggestionList
            items={suggestions}
            onItemSelect={handleItemSelect}
            hidden={!isSuggestionsVisible}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

const data = [
  { id: 1, name: 'Mudit', email: 'muditgarg.iitdelhi@gmail.com', thumbnail: 'assets/img1.jpeg' },
  { id: 2, name: 'Utkarsh', email: 'utkarsh@gmail.com', thumbnail: 'assets/img2.jpeg' },
  { id: 3, name: 'Harsh', email: 'harsh123@yahoo.com', thumbnail: 'assets/img3.jpeg' },
  { id: 4, name: 'Rahul Kumar mehra', email: 'rahulmehra@gmail.com', thumbnail: 'assets/img4.jpeg' },
  { id: 5, name: 'Yatharth', email: 'yatharthkumargupta@iitd.alumni.com', thumbnail: 'assets/img5.jpeg' },
  { id: 6, name: 'Srijan', email: 'srijan@gmail.com', thumbnail: 'assets/img6.jpeg' },
  { id: 7, name: 'Kartik', email: 'kartik@gmail.com', thumbnail: 'assets/img7.jpeg' },
  { id: 8, name: 'Sachyn', email: 'sachyn@gmail.com', thumbnail: 'assets/img8.jpeg' },
]

