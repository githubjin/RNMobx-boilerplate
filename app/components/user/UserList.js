/**
 * @flow
 */
import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import type { UserType } from "../../types";

export default class UserList extends Component {
  props: {
    data: UserType[]
  };
  renderItem = ({ item }: { item: UserType }) => {
    return (
      <View style={styles.itemContainer}>
        <UserItem item={item} />
      </View>
    );
  };
  keyExtractor = (item: UserType) => item.user.id;
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

function UserItem({ item }: { item: UserType }) {
  return (
    <View>
      <Text>
        {item.user.mobile}
      </Text>
      <Text>
        {item.user.name}
      </Text>
      <Text>
        {item.id_verified}
      </Text>
      <Text>
        {item.user.created_at}
      </Text>
      <Text>
        {item.roles}
      </Text>
      <Text>
        {item.status}
      </Text>
      <Text>
        {item.user.id}
      </Text>
    </View>
  );
}

UserList.defaultProps = {
  data: []
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 10
  }
});
