//This component has been created to implement 'lazy-loading' or 'code-splitting'. Works only for 'create-react-app' and 'react-router-4'. It heavily depends from webpack configuration. It will help us load the component only when needed. Below component will help us load a component that we need to be loaded when required.

import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
	return class extends Component {
		state = {
			component: null
		}

		componentDidMount() {
			importComponent()
			.then(cmp => {
				this.setState({component: cmp.default});
			});
		}

		render() {
			const C = this.state.component;
			return C ? <C {...this.props} />: null;
		}
	}
}

export default asyncComponent;