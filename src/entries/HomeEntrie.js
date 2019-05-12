import React from 'react'
import {render} from 'react-dom'

import Home from '../pages/home/home'

const homeContainer = document.getElementById('root')

const login =  <Home />

render(
  login
, homeContainer);