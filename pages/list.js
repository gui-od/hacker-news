import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Item from '../components/Item'
import { fetchStories } from '../util/HNService'

export default class extends React.Component {
  static async getInitialProps ({ query: { type, page } }) {
    const list = await fetchStories(type, page)

    return {
      prevLink: page > 1 ? `/${type}?page=${(parseInt(page) - 1)}` : null,
      nextLink: page < 10 ? `/${type}?page=${(parseInt(page) + 1)}` : null,
      pageTitle: type,
      items: list
    }
  }

  getItems() {
    const { items } = this.props;

    if (!items.length) return <h3 className="title has-text-centered">Nothing Found...</h3>

    return items.map((item, i) => <Item key={ i } item={ item } />)
  }

  getPaginationPrev() {
    if (!this.props.prevLink) return null;
    if (!this.props.items.length) return null;

    return (
      <Link href={this.props.prevLink}>
        <a className="pagination-previous">Previous</a>
      </Link>
    )
  }

  getPaginationNext() {
    if (!this.props.nextLink) return null;
    if (!this.props.items.length) return null;

    return (
      <Link href={this.props.nextLink}>
        <a className="pagination-next">Next page</a>
      </Link>
    )
  }

  render () {
    return (
      <Layout>
        <Header title={ this.props.pageTitle } />

        <div className="section">
          <div className="container">
            { this.getItems() }
          </div>
        </div>

        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-2">
                <nav className="pagination is-right" role="navigation" aria-label="pagination">
                  {this.getPaginationPrev()}
                  {this.getPaginationNext()}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
