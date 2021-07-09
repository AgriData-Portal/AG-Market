/* Queries */

//List Chat Groups by updatedAt, able to check the user's last online or can use get users (should be a more effiecient query) {need to raise this question to AWS Support}
export const listChatsContainingUser = /* GraphQL */ `
  query ListChatGroupUserss(
    $filter: ModelChatGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatGroupUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        chatGroupID
        lastOnline
        chatGroup {
          name
          updatedAt
          mostRecentMessage
        }
      }
      nextToken
    }
  }
`;

//List Messages in Chat Room by createdAt
export const listMessagesInChat = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        content
        senderID
        uniqueContentID
        sender
        createdAt
      }
      nextToken
    }
  }
`;

//list users in chat room
export const listUsersInChat = /* GraphQL */ `
  query ListChatGroupUserss(
    $filter: ModelChatGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatGroupUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user {
          id
          name
        }
        nextToken
      }
    }
  }
`;
//list users in company
export const listUsersInCompany = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;

/* Mutations */

//update last message for each chat
export const updateLastMessageSent = /* GraphQL */ `
  mutation UpdateChatGroup(
    $input: UpdateChatGroupInput!
    $condition: ModelChatGroupConditionInput
  ) {
    updateChatGroup(input: $input, condition: $condition) {
      id
      updatedAt
      mostRecentMessage
    }
  }
`;
//update last online on each chat
export const updateLastOnlineForUserPerChat = /* GraphQL */ `
  mutation UpdateChatGroupUsers(
    $input: UpdateChatGroupUsersInput!
    $condition: ModelChatGroupUsersConditionInput
  ) {
    updateChatGroupUsers(input: $input, condition: $condition) {
      lastOnline
    }
  }
`;

//add user to chat room
export const addUserToChat = /* GraphQL */ `
  mutation CreateChatGroupUsers(
    $input: CreateChatGroupUsersInput!
    $condition: ModelChatGroupUsersConditionInput
  ) {
    createChatGroupUsers(input: $input, condition: $condition) {
      id
      userID
      chatGroupID
    }
  }
`;

//remove user from chat group
export const removeUserFromChat = /* GraphQL */ `
  mutation DeleteChatGroupUsers(
    $input: DeleteChatGroupUsersInput!
    $condition: ModelChatGroupUsersConditionInput
  ) {
    deleteChatGroupUsers(input: $input, condition: $condition) {
      id
    }
  }
`;

//create message
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      chatGroupID
      type
      content
      senderID
      uniqueContentID
      sender
      createdAt
      updatedAt
    }
  }
`;
//create chat room
export const createChat = /* GraphQL */ `
  mutation CreateChatGroup(
    $input: CreateChatGroupInput!
    $condition: ModelChatGroupConditionInput
  ) {
    createChatGroup(input: $input, condition: $condition) {
      id
      name
    }
  }
`;

/* Subscriptions */
