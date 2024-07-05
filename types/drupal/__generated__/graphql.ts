/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An email address. */
  Email: { input: any; output: any; }
  /**
   * An HTML string
   *
   * Content of this type is deemed safe by the server for raw output given the
   * origin and the context of its usage. The HTML can still contain scripts or style
   * tags where the creating user had permission to input these.
   */
  Html: { input: any; output: any; }
  /** A field whose value conforms to the standard E.164 */
  PhoneNumber: { input: any; output: any; }
  /** RFC 3339 compliant time string. */
  Time: { input: any; output: any; }
  /** A field whose value exists in the standard IANA Time Zone Database. */
  TimeZone: { input: any; output: any; }
  /** Type represents date and time as number of milliseconds from start of the UNIX epoch. */
  Timestamp: { input: any; output: any; }
  /** Untyped structured data. Eg JSON, configuration, settings, attributes. */
  UntypedStructuredData: { input: any; output: any; }
  /** A string that will have a value of format ±hh:mm */
  UtcOffset: { input: any; output: any; }
  _: { input: any; output: any; }
};

/** Block content is a modular piece of content that can be displayed in various regions of a website's layout. */
export type BlockContent = BlockInterface & {
  __typename?: 'BlockContent';
  /** The Content Block entity to be displayed within the block. */
  entity: UnsupportedType;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The rendered output of the block. */
  render?: Maybe<Scalars['Html']['output']>;
  /** The title of the block if provided. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Blocks are a modular piece of content that can be displayed in various regions of a website's layout. */
export type BlockInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The rendered output of the block. */
  render?: Maybe<Scalars['Html']['output']>;
  /** The title of the block if provided. */
  title?: Maybe<Scalars['String']['output']>;
};

/** A generic block plugin is a modular piece of content that can be displayed in various regions of a website's layout. */
export type BlockPlugin = BlockInterface & {
  __typename?: 'BlockPlugin';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The rendered output of the block. */
  render?: Maybe<Scalars['Html']['output']>;
  /** The title of the block if provided. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Block types that can exist in the system. */
export type BlockUnion = BlockContent | BlockPlugin;

/** A DateTime object. */
export type DateTime = {
  __typename?: 'DateTime';
  /** A string that will have a value of format ±hh:mm */
  offset: Scalars['UtcOffset']['output'];
  /** RFC 3339 compliant time string. */
  time: Scalars['Time']['output'];
  /** Type represents date and time as number of milliseconds from start of the UNIX epoch. */
  timestamp: Scalars['Timestamp']['output'];
  /** A field whose value exists in the standard IANA Time Zone Database. */
  timezone: Scalars['TimeZone']['output'];
};

/** A file object to represent an managed file. */
export type File = {
  __typename?: 'File';
  /** The description of the file. */
  description?: Maybe<Scalars['String']['output']>;
  /** The mime type of the file. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The name of the file. */
  name?: Maybe<Scalars['String']['output']>;
  /** The size of the file in bytes. */
  size: Scalars['Int']['output'];
  /** The URL of the file. */
  url: Scalars['String']['output'];
};

/** A image object to represent an managed file. */
export type Image = {
  __typename?: 'Image';
  /** The alt text of the image. */
  alt?: Maybe<Scalars['String']['output']>;
  /** The height of the image. */
  height: Scalars['Int']['output'];
  /** The mime type of the image. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The size of the image in bytes. */
  size: Scalars['Int']['output'];
  /** The title text of the image. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the image. */
  url: Scalars['String']['output'];
  /** Image variations control different sizes and formats for images. */
  variations?: Maybe<Array<ImageStyleDerivative>>;
  /** The width of the image. */
  width: Scalars['Int']['output'];
};


/** A image object to represent an managed file. */
export type ImageVariationsArgs = {
  styles?: InputMaybe<Array<InputMaybe<ImageStyleAvailable>>>;
};

/** Entity type image_style. */
export type ImageStyle = ImageStyleInterface & {
  __typename?: 'ImageStyle';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** List of image styles available to use. */
export enum ImageStyleAvailable {
  /** No image styles have been enabled. */
  Undefined = 'UNDEFINED'
}

/** ImageStyle derivatives for an Image. */
export type ImageStyleDerivative = {
  __typename?: 'ImageStyleDerivative';
  height: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

/** Entity type image_style. */
export type ImageStyleInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Entity type image_style. */
export type ImageStyleUnion = ImageStyle;

/** Generic input for key-value pairs. */
export type KeyValueInput = {
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

/** A language definition provided by the CMS. */
export type Language = {
  __typename?: 'Language';
  /** The language direction. */
  direction?: Maybe<Scalars['String']['output']>;
  /** The language code. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The language name. */
  name?: Maybe<Scalars['String']['output']>;
};

/** A link. */
export type Link = {
  __typename?: 'Link';
  /** Whether the link is internal to this website. */
  internal: Scalars['Boolean']['output'];
  /** The title of the link. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the link. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Use local images for reusable media. */
export type MediaImage = MediaInterface & {
  __typename?: 'MediaImage';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Image */
  mediaImage: Image;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Entity type media. */
export type MediaInterface = {
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** Name */
  name: Scalars['String']['output'];
  /** URL alias */
  path: Scalars['String']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
};

/** Entity type media. */
export type MediaUnion = MediaImage;

/** Entity type menu. */
export type Menu = MenuInterface & {
  __typename?: 'Menu';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The menu items. */
  items: Array<MenuItem>;
  /** The menu name. */
  name: Scalars['String']['output'];
};

/** List of menus available to load. */
export enum MenuAvailable {
  /** No menus have been enabled. */
  Undefined = 'UNDEFINED'
}

/** Entity type menu. */
export type MenuInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The menu items. */
  items: Array<MenuItem>;
  /** The menu name. */
  name: Scalars['String']['output'];
};

/** A menu item defined in the CMS. */
export type MenuItem = {
  __typename?: 'MenuItem';
  /** Attributes of this menu item. */
  attributes: MenuItemAttributes;
  /** Child menu items of this menu item. */
  children: Array<MenuItem>;
  /** The description of the menu item. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether this menu item is intended to be expanded. */
  expanded: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Whether this menu item links to an internal route. */
  internal: Scalars['Boolean']['output'];
  /** The language of the menu item. */
  langcode: Language;
  /** The route this menu item uses. Route loading can be disabled per menu type. */
  route?: Maybe<RouteUnion>;
  /** The title of the menu item. */
  title: Scalars['String']['output'];
  /** The URL of the menu item. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Menu item options set within the CMS. */
export type MenuItemAttributes = {
  __typename?: 'MenuItemAttributes';
  class?: Maybe<Scalars['String']['output']>;
};

/** Entity type menu. */
export type MenuUnion = Menu;

/** The schema's entry-point for mutations. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Placeholder for mutation extension. */
  _: Scalars['Boolean']['output'];
};

/** Use <em>articles</em> for time-sensitive content like news, press releases or blog posts. */
export type NodeArticle = NodeInterface & {
  __typename?: 'NodeArticle';
  /** Body */
  body?: Maybe<TextSummary>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Image */
  image?: Maybe<Image>;
  /** Language */
  langcode: Language;
  /** URL alias */
  path: Scalars['String']['output'];
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Enter a comma-separated list. For example: Amsterdam, Mexico City, "Cleveland, Ohio" */
  tags?: Maybe<Array<UnsupportedType>>;
  /** Title */
  title: Scalars['String']['output'];
};

/** Entity type node. */
export type NodeInterface = {
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** URL alias */
  path: Scalars['String']['output'];
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Title */
  title: Scalars['String']['output'];
};

/** Use <em>basic pages</em> for your static content, such as an 'About us' page. */
export type NodePage = NodeInterface & {
  __typename?: 'NodePage';
  /** Body */
  body?: Maybe<TextSummary>;
  /** The time that the node was last edited. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Language */
  langcode: Language;
  /** URL alias */
  path: Scalars['String']['output'];
  /** Promoted to front page */
  promote: Scalars['Boolean']['output'];
  /** Published */
  status: Scalars['Boolean']['output'];
  /** Sticky at top of lists */
  sticky: Scalars['Boolean']['output'];
  /** Title */
  title: Scalars['String']['output'];
};

/** Entity type node. */
export type NodeUnion = NodeArticle | NodePage;

/** The schema's entry-point for queries. */
export type Query = {
  __typename?: 'Query';
  /** Load a Block plugin. */
  block?: Maybe<BlockUnion>;
  /** Schema information. */
  info: SchemaInformation;
  /** Load a Menu by name. */
  menu?: Maybe<Menu>;
  /** Load a Route by path. */
  route?: Maybe<RouteUnion>;
};


/** The schema's entry-point for queries. */
export type QueryBlockArgs = {
  id: Scalars['ID']['input'];
};


/** The schema's entry-point for queries. */
export type QueryMenuArgs = {
  name: MenuAvailable;
};


/** The schema's entry-point for queries. */
export type QueryRouteArgs = {
  path: Scalars['String']['input'];
};

/** Routes represent incoming requests that resolve to content. */
export type Route = {
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** A list of possible entities that can be returned by URL. */
export type RouteEntityUnion = NodeArticle | NodePage;

/** Route outside of this website. */
export type RouteExternal = Route & {
  __typename?: 'RouteExternal';
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Route within this website. */
export type RouteInternal = Route & {
  __typename?: 'RouteInternal';
  /** Breadcrumb links for this route. */
  breadcrumbs?: Maybe<Array<Link>>;
  /** Content assigned to this route. */
  entity?: Maybe<RouteEntityUnion>;
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Redirect to another URL with status. */
export type RouteRedirect = Route & {
  __typename?: 'RouteRedirect';
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** Utility prop. Always true for redirects. */
  redirect: Scalars['Boolean']['output'];
  /** Suggested status for redirect. Eg 301. */
  status: Scalars['Int']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Route types that can exist in the system. */
export type RouteUnion = RouteExternal | RouteInternal | RouteRedirect;

/** Schema information provided by the system. */
export type SchemaInformation = {
  __typename?: 'SchemaInformation';
  /** The schema description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The internal path to the front page. */
  home?: Maybe<Scalars['String']['output']>;
  /** The schema version. */
  version?: Maybe<Scalars['String']['output']>;
};

/** Sort direction. */
export enum SortDirection {
  /** Ascending */
  Asc = 'ASC',
  /** Descending */
  Desc = 'DESC'
}

/** The schema's entry-point for subscriptions. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Placeholder for subscription extension. */
  _: Scalars['Boolean']['output'];
};

/** A processed text format defined by the CMS. */
export type Text = {
  __typename?: 'Text';
  /** The text format used to process the text value. */
  format?: Maybe<Scalars['String']['output']>;
  /** The processed text value. */
  processed?: Maybe<Scalars['Html']['output']>;
  /** The raw text value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** A processed text format with summary defined by the CMS. */
export type TextSummary = {
  __typename?: 'TextSummary';
  /** The text format used to process the text value. */
  format?: Maybe<Scalars['String']['output']>;
  /** The processed text value. */
  processed?: Maybe<Scalars['Html']['output']>;
  /** The processed text summary. */
  summary?: Maybe<Scalars['Html']['output']>;
  /** The raw text value. */
  value?: Maybe<Scalars['String']['output']>;
};

/**
 * Unsupported entity or field type in the schema.
 * This entity may not have been enabled in the schema yet and is being referenced via entity reference.
 */
export type UnsupportedType = {
  __typename?: 'UnsupportedType';
  /** Unsupported type, always TRUE. */
  unsupported?: Maybe<Scalars['Boolean']['output']>;
};

/** Views represent collections of curated data from the CMS. */
export type View = {
  /** The description of the view. */
  description?: Maybe<Scalars['String']['output']>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** The ID of the view. */
  id: Scalars['ID']['output'];
  /** The human friendly label of the view. */
  label?: Maybe<Scalars['String']['output']>;
  /** The language code of the view. */
  langcode?: Maybe<Scalars['String']['output']>;
  /** Information about the page in the view. */
  pageInfo: ViewPageInfo;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

/** An exposed filter option for the view. */
export type ViewFilter = {
  __typename?: 'ViewFilter';
  /** The filter element attributes. */
  attributes: Scalars['UntypedStructuredData']['output'];
  /** The filter element description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The filter identifier. */
  id: Scalars['ID']['output'];
  /** The filter element label. */
  label?: Maybe<Scalars['String']['output']>;
  /** Whether the filter allows multiple values. */
  multiple: Scalars['Boolean']['output'];
  /** The filter element options if any are defined. */
  options?: Maybe<Scalars['UntypedStructuredData']['output']>;
  /** The filter plugin type. */
  plugin: Scalars['String']['output'];
  /** Whether the filter is required. */
  required: Scalars['Boolean']['output'];
  /** The filter field type. */
  type: Scalars['String']['output'];
  /** The value for the filter. Could be an array for multiple values. */
  value?: Maybe<Scalars['UntypedStructuredData']['output']>;
};

/** Information about the page in a view. */
export type ViewPageInfo = {
  __typename?: 'ViewPageInfo';
  /** Any result offset being used. */
  offset: Scalars['Int']['output'];
  /** The current page being returned. */
  page: Scalars['Int']['output'];
  /** How many results per page. */
  pageSize: Scalars['Int']['output'];
  /** How many results total. */
  total: Scalars['Int']['output'];
};

/** A reference to an embedded view */
export type ViewReference = {
  __typename?: 'ViewReference';
  /** The contextual filter values used. */
  contextualFilter?: Maybe<Array<Scalars['String']['output']>>;
  /** The machine name of the display. */
  display: Scalars['String']['output'];
  /** How many results per page. */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** The name of the query used to fetch the data, if the view is a GraphQL display. */
  query?: Maybe<Scalars['String']['output']>;
  /** The machine name of the view. */
  view: Scalars['String']['output'];
};

/** All available view result types. */
export type ViewResultUnion = UnsupportedType;

export type GetNodeByPathQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetNodeByPathQuery = { __typename?: 'Query', route?: { __typename: 'RouteExternal' } | { __typename: 'RouteInternal', entity?: (
      { __typename: 'NodeArticle', status: boolean }
      & { ' $fragmentRefs'?: { 'ArticleFullFragmentFragment': ArticleFullFragmentFragment } }
    ) | (
      { __typename: 'NodePage', status: boolean }
      & { ' $fragmentRefs'?: { 'BasicPageFragmentFragment': BasicPageFragmentFragment } }
    ) | null } | { __typename: 'RouteRedirect' } | null };

export type ArticleFullFragmentFragment = { __typename?: 'NodeArticle', title: string, created: { __typename?: 'DateTime', timestamp: any }, body?: { __typename?: 'TextSummary', processed?: any | null } | null } & { ' $fragmentName'?: 'ArticleFullFragmentFragment' };

export type BasicPageFragmentFragment = { __typename?: 'NodePage', title: string, body?: { __typename?: 'TextSummary', processed?: any | null } | null } & { ' $fragmentName'?: 'BasicPageFragmentFragment' };

export type MenuItemFragmentFragment = { __typename?: 'MenuItem', title: string, id: string, url?: string | null, internal: boolean, attributes: { __typename?: 'MenuItemAttributes', class?: string | null } } & { ' $fragmentName'?: 'MenuItemFragmentFragment' };

export const ArticleFullFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArticleFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processed"}}]}}]}}]} as unknown as DocumentNode<ArticleFullFragmentFragment, unknown>;
export const BasicPageFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicPageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processed"}}]}}]}}]} as unknown as DocumentNode<BasicPageFragmentFragment, unknown>;
export const MenuItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"}}]}},{"kind":"Field","name":{"kind":"Name","value":"internal"}}]}}]} as unknown as DocumentNode<MenuItemFragmentFragment, unknown>;
export const GetNodeByPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNodeByPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RouteInternal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArticleFullFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicPageFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArticleFullFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodeArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicPageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NodePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processed"}}]}}]}}]} as unknown as DocumentNode<GetNodeByPathQuery, GetNodeByPathQueryVariables>;