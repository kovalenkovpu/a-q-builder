import React, { Component } from 'react';
import { Query, Builder } from 'react-awesome-query-builder';
import 'react-awesome-query-builder/css/styles.scss';
import 'react-awesome-query-builder/css/compact_styles.scss';
import 'react-awesome-query-builder/css/denormalize.scss';
import config from './config';

import './GenericQueryBuilder.css';

class ClearAll extends Component {
  render() {
    return (
      <button
        onClick={this.props.clearHandler}
        className={'ant-btn clear-all'}
      >
        Clear All
      </button>
    )
  }
}

export default class GenericQueryBuilder extends Component {
  state = {
    tree: null,
  };

  clearQuery = () => {
    this.setState({ tree: null });
  };

  onChange = (tree) => {
    //here you can save tree object (it's a Map() instance)
    this.setState({ tree });

    const treeJSON = JSON.stringify(tree, null, '\t');

    console.clear();
    console.log(treeJSON);
  };

  getChildren = (props) => {
    return (
      <div>
        <div className="query-builder">
          <Builder {...props} />
        </div>
      </div>
    )
  };

  render() {
    const { isComplex } = this.props;
    const { tree } = this.state;

    return (
      <section className='builder-wrapper'>
        <Query
          {...config}
          value={tree}
          get_children={this.getChildren}
          onChange={this.onChange}
        />
        <ClearAll clearHandler={this.clearQuery}/>
      </section>
    );
  }
}