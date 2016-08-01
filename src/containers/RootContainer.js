import React, { PropTypes } from 'react'
import { AppContainer } from 'react-hot-loader'

class RootContainer extends React.Component {
  static propTypes = {
    history: PropTypes.node.isRequired,
    routes: PropTypes.node.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.node.isRequired
  }

  render () {
    const { history, routes, routerKey, store } = this.props

    return (

    <AppContainer>
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} key={routerKey} />
        </div>
      </Provider>
    </AppContainer>
    )
  }
}

export default RootContainer
