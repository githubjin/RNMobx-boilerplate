/**
 * @flow
 */
import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, Platform } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
// import faIcon from "react-native-vector-icons/FontAwesome";

import type { UserType } from "../../types";
import { statusArray } from "../../constants/metaData";
import { BORDER_PRIMARY_COLOR } from "../../constants/colors";

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
    <View
      style={{
        paddingHorizontal: 8,
        borderBottomColor: "#333333",
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...Platform.select({
          android: {
            elevation: 1
          },
          ios: {
            shadowOffset: {
              width: 1,
              height: 1
            },
            shadowColor: "#333333",
            shadowOpacity: 0.5,
            shadowRadius: 0.5
          }
        })
      }}
    >
      <View>
        <Text style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {item.user.mobile}
        </Text>
        <Text>
          {item.user.name}
        </Text>
      </View>
      <Text>
        {item.user.created_at}
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {item.roles.map(role =>
          <Text>
            {role.name}
          </Text>
        )}
      </View>
      <Text>
        {!item.id_verified && <Icon name="phone" />}
        {!item.id_verified && <Icon name="envelope" />}
        {!item.id_verified && <Icon name="user" />}
      </Text>
      <Text>
        {statusArray[item.status]}
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
