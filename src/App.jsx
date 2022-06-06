import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import inventory from './__mocks__/foods.json';
import categories from './__mocks__/categories.json';


import Button from './components/button';
import Item from './components/item';

import './App.css';

class App extends Component {
  state = {
    currentCat: { id: null, name: 'All' },
    productsData: [],
    filteredProducts: [],
    // eslint-disable-next-line react/no-unused-state
    showMore: false,
  };

  // eslint-disable-next-line react/sort-comp
  getInventory(currentCategory) {
    const { currentCat, filteredProducts } = this.state;
    const cat = currentCategory || currentCat;
    const products = inventory.filter((item) => {
      let selected = false;
      if (cat.name === 'All') {
        selected = true;
      } else if (cat.id === item.categoryId) {
        selected = true;
      }
      return selected;
    });
    const items = products.slice(0, filteredProducts.length + 9);
    this.setState({ filteredProducts: items });
    return products;
  }

  componentDidMount() {
    const products = this.getInventory();
    this.setState({ productsData: products });
  }

  // eslint-disable-next-line react/sort-comp
  getCategories() {
    return categories.map(cat => (
      <span key={cat.id}>
        <Button
          value={cat.name}
          classes={this.buttonClasses(cat.name)}
          onClick={() => this.changeCategory(cat)}
        />
      </span>
    ));
  }

  // eslint-disable-next-line react/sort-comp
  buttonClasses(cat) {
    let classes = 'button';
    const { currentCat } = this.state;
    if (currentCat.name === cat) {
      classes += ' active';
    }
    if (cat === categories[categories.length - 1].name) {
      classes += ' last';
    }

    return classes;
  }

  allButtonClasses() {
    const { currentCat } = this.state;
    return currentCat.length === 0 ? 'button active' : 'button';
  }

  changeCategory(cat) {
    const updatedCat = { id: cat.id, name: cat.name };
    // eslint-disable-next-line react/no-unused-state
    this.setState({ showMore: false });
    this.setState({ currentCat: updatedCat });
    this.getInventory(updatedCat);
  }

  search(value) {
    const { productsData } = this.state;
    const filtered = productsData.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    this.setState({ filteredProducts: filtered });
  }


  handleShowMore = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ showMore: true });
    this.getInventory();
  }

  render() {
    const { filteredProducts } = this.state;
    return (
      <div className="App">
        <div className="category-container">
          <span className="searchbar">
            <AiOutlineSearch />
            <input
              placeholder="Enter Restaurant Name..."
              className="search"
              onChange={e => this.search(e.target.value)}
            />
          </span>
          <div>
            <span key="All" className="first">
              <Button
                value="All"
                classes={this.allButtonClasses()}
                onClick={() => this.changeCategory({ id: 0, name: 'All' })}
              />
            </span>
            {this.getCategories()}
          </div>
        </div>

        <div className="items-container">
          {filteredProducts.map(item => (
            <Item
              key={item.id}
              name={item.name}
              rating={item.rating}
              img={item.imageUrl}
              time={[item.minCookTime, item.maxCookTime]}
              isNew={item.isNew}
              promotion={item.promotion}
            />
          ))}
          <div className="show-more">
            <button
              type="button"
              onClick={this.handleShowMore}
            >
              + Show More
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
