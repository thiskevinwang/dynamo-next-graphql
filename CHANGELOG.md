# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [v0.8.0] - 2020-05-09

### Changes

- Introducing Teams
- Mimic Slack's web client path params

  - `/[teamId]/[channelId]/user_profile/[userId]`

![image](https://user-images.githubusercontent.com/26389321/81488534-0224a000-9238-11ea-8d6a-a984d748437b.png)

### Added

- create `TeamsContext` & `useTeams`
  - query for teams in TeamContext provider
- `statusActive` theme
  - for the little colored status dot

### Removed

- "products"

### Changelog

https://github.com/thiskevinwang/dynamo-next-graphql/compare/v0.7.2...v0.8.0

## [v0.7.2] - 2020-05-09

### Added

- `styled-theming`
- `@types/styled-theming`
- Slack themes (Light & Dark)
  - Aubergine
  - Ochin
  - Mood Indigo
- Added `<LinkActive>` component for active URL path styling

### Changes

![gif](https://user-images.githubusercontent.com/26389321/81464409-938c0780-918f-11ea-909e-b33ea7407d50.gif)

### Changelog

https://github.com/thiskevinwang/dynamo-next-graphql/compare/v0.7.1...v0.7.2

## [v0.7.1] - 2020-05-07

### Changes

- Mimic Slack's Sticky Day Divider

### Added

- `RightPanelContext` & `useRightPanel` hook

![image](https://user-images.githubusercontent.com/26389321/81364304-53575700-90b3-11ea-9dc5-a6f96e76c13d.png)

### Changelog

https://github.com/thiskevinwang/dynamo-next-graphql/compare/v0.7.0...v0.7.1

## [v0.7.0] - 2020-05-05

Depends on https://github.com/thiskevinwang/dynamodb-graphql-server/releases/tag/v0.7.0

### Changes

Add functionality to support `Channels` and `Messages`

- make `/[channelName]` query for Messages
- extract `ChannelList` to query for Channels
- create LayoutContext
  - this helps scroll functionality
  - only scroll to bottom on `/channels/[channelName]`

### Changelog

https://github.com/thiskevinwang/dynamo-next-graphql/compare/v0.6.0...v0.7.0

## [v0.6.0] - 2020-05-03

### Changes

add type of input fields ff50a31

Layout - tokenize css values abbb42b

let profile page update user's avatatUrl 161f962

add Cereal & FiraCode fonts 66432eb

RightPanel - use avatarUrl 0ab670d

## [v0.5.0] - 2020-05-02

### Changes

Bump minor version to be in sync with https://github.com/thiskevinwang/dynamodb-graphql-server/pull/9

Install `jsonwebtoken`

Create `AuthContext` & hook

## [v0.0.3] - 2020-05-02

### Changes

Recreate Slack's grid/layout
Add `_app`
Add login, signup, avatar upload pages

![image](https://user-images.githubusercontent.com/26389321/80871870-72ea1c00-8c7c-11ea-9b9d-2b44f0c04e95.png)

## [v0.0.2] - 2020-04-30

### Changes

Begin Changelog

Interface with https://github.com/thiskevinwang/dynamodb-graphql-server
