/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import firebase from 'firebase';

/**
 * @exports
 * @desc User Authentication using [facebook,twitter].
 * @author {Yasser Ameur El Idrissi}
 * @update 27/03/2018
 * @function
 * @name {Auth}
 * @param {Object} provider
 * @returns {Promise}
 */
export function Auth(provider) {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // The signed-in user info.
      return result.user;
      // ...
    });
}
