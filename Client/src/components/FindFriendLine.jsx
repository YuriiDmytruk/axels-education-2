import React, {useState} from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Text, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import styles from '../styles/FindFriendLine';
import {patchFriend, putUser} from '../util/api'
import { addUser } from '../redux/ducks/users';

const FindFriendLine = ({ user, loggedInUser }) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const theme = useTheme();
  const dispatch = useDispatch();

  const onAddClick = async() => {
    setIsDisabled(true);
    await patchFriend(loggedInUser._id, user._id, 'add')
    const userData = (await putUser({email: loggedInUser.email, password: loggedInUser.password})).value;
    dispatch(addUser(userData));
  }

  const onGaleryClick = () => {

  }

  return (
    <View style={styles.userContainer}>
      <View>
        <Text variant="headlineSmall">{user.nickName}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="elevated" onPress={onAddClick} disabled={isDisabled}>
          <Text variant="titleMedium">Add to Friends</Text>
        </Button>
        <Button mode="elevated" onPress={onGaleryClick}>
          <Text variant="titleMedium">Galery</Text>
        </Button>
      </View>
    </View>
  );
};

export default FindFriendLine;
