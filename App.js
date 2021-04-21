import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './app/routing/index';

//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './app/redux/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
		<SafeAreaProvider>
			{/* Added StatusBar for iOS to see time/battery on each 
      page except where page has a black background */}
			<StatusBar
        barStyle='dark-content'
			/>
			<Provider store={store}>
				<Navigation />
			</Provider>
		</SafeAreaProvider>
	);
}
