import React, { Component } from 'react';
import './src/config/firebaseInit';
import Navigation from './src/navigation';

/**
 * @exports
 * @desc Root Component
 * @author {Yasser Ameur El Idrissi}
 * @upadate 27/03/2018
 * @function
 * @name {App}
 * @returns {Component}
 */
export default function App() {
  return <Navigation />;
}
