/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// firebase intialization.
import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from './firebase';
export default firebase.initializeApp(firebaseConfig).firestore();
