// ─── Shopify Storefront API GraphQL Queries ───────────────────────────────────

/**
 * Fragment for reusable Product data.
 * Optimized to fetch pricing, variant details, and SEO metadata.
 */
export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    productType
    tags
    requiresSellingPlan
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    media(first: 20) {
      nodes {
        mediaContentType
        alt
        ... on Video {
          id
          sources {
            url
            mimeType
            format
            height
            width
          }
          previewImage {
            url
          }
        }
        ... on ExternalVideo {
          id
          embedUrl
          previewImage {
            url
          }
        }
        ... on MediaImage {
          id
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    images(first: 8) {
      nodes {
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      name
      values
    }
    metafields(identifiers: [
      {namespace: "reviews", key: "rating"},
      {namespace: "reviews", key: "rating_count"}
    ]) {
      namespace
      key
      value
    }
    variants(first: 250) {
      nodes {
        id
        title
        availableForSale
        sku
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        sellingPlanAllocations(first: 10) {
          nodes {
            checkoutChargeAmount {
              amount
              currencyCode
            }
            priceAdjustments {
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              perDeliveryPrice {
                amount
                currencyCode
              }
            }
            sellingPlan {
              id
              name
              description
              options {
                name
                value
              }
              recurringDeliveries
            }
          }
        }
      }
    }
    sellingPlanGroups(first: 5) {
      nodes {
        name
        appName
        options {
          name
          values
        }
        sellingPlans(first: 10) {
          nodes {
            id
            name
            description
            recurringDeliveries
            options {
              name
              value
            }
            priceAdjustments {
              orderCount
              adjustmentValue {
                ... on SellingPlanFixedAmountPriceAdjustment {
                  adjustmentAmount {
                    amount
                    currencyCode
                  }
                }
                ... on SellingPlanPercentagePriceAdjustment {
                  adjustmentPercentage
                }
                ... on SellingPlanFixedPriceAdjustment {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
    seo {
      description
      title
    }
  }
`;

/**
 * Fragment for reusable Article data.
 */
export const ARTICLE_FRAGMENT = `
  fragment ArticleFragment on Article {
    id
    handle
    title
    contentHtml
    excerptHtml
    publishedAt
    image {
      url
      altText
      width
      height
    }
    authorV2 {
      name
    }
    tags
  }
`;

/**
 * Fragment for reusable Cart data.
 * Used across Cart Creation, Line Updates, and Fetches.
 */
export const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            product {
              id
              handle
              title
              featuredImage {
                url
                altText
              }
            }
          }
        }
        sellingPlanAllocation {
          sellingPlan {
            id
            name
            description
          }
          priceAdjustments {
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            perDeliveryPrice {
              amount
              currencyCode
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          amountPerQuantity {
            amount
            currencyCode
          }
          compareAtAmountPerQuantity {
            amount
            currencyCode
          }
        }
        attributes {
          key
          value
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
        firstName
        lastName
      }
    }
  }
`;

// ─── Product Queries ──────────────────────────────────────────────────────────

export const GET_ALL_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetAllProducts(
    $first: Int!
    $after: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) {
    products(
      first: $first
      after: $after
      sortKey: $sortKey
      reverse: $reverse
      query: $query
    ) {
      nodes {
        ...ProductFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_COLLECTION_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetCollection(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
      ) {
        nodes {
          ...ProductFragment
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCT_RECOMMENDATIONS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductFragment
    }
  }
`;

// ─── Blog Queries ─────────────────────────────────────────────────────────────

export const GET_ALL_ARTICLES_QUERY = `
  ${ARTICLE_FRAGMENT}
  query GetAllArticles($first: Int!, $after: String) {
    articles(first: $first, after: $after, sortKey: PUBLISHED_AT, reverse: true) {
      nodes {
        ...ArticleFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ARTICLE_BY_HANDLE_QUERY = `
  ${ARTICLE_FRAGMENT}
  query GetArticleByHandle($blogHandle: String!, $handle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $handle) {
        ...ArticleFragment
      }
    }
  }
`;

// ─── Cart Queries & Mutations ──────────────────────────────────────────────────

export const GET_CART_QUERY = `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
`;

export const CART_CREATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// ─── Shop Settings ────────────────────────────────────────────────────────────

export const GET_SHOP_SETTINGS_QUERY = `
  query GetShopSettings {
    shop {
      name
      description
      paymentSettings {
        acceptedCardBrands
        supportedDigitalWallets
        enabledPresentmentCurrencies
      }
      primaryDomain {
        url
        host
      }
      privacyPolicy {
        title
        url
      }
      termsOfService {
        title
        url
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS_QUERY = `
  query GetAllCollections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
      }
    }
  }
`;

// Legacy Checkout mutation (kept for backward compatibility if needed)
export const CHECKOUT_CREATE_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
