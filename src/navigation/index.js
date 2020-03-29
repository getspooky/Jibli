/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/**
 * @internal
 * @modules
 * @desc Screens to use in the application
 */
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Role from '../screens/Role';
import Tracking from '../screens/Tracking';
import Configuration from '../screens/Configuration';

/**
 * @internal
 * @desc Navigation stack
 * @var screens
 * @type {Function}
 */
const screens = createStackNavigator(
  {
    Welcome,
    Register,
    Login,
    Role,
    Tracking,
    Configuration,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(screens);
