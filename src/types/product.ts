export interface ICategory {
  id: number
  name: string
  slug: string
  updatedAt: string,
  createdAt: string
}

export interface IComment {
  id: number
  name: string
  message: string
  rating: number
  userId: number
  productId: number
  images?: string[]
  videos?: string[]
  product?: IProduct
}

export interface IAttributeValue {
  id: number
  name: string
  slug: string
}

export interface IAttribute {
  id: number
  name: string
  slug: string
  attribute_values: IAttributeValue[]
}

export interface IProductAttribute {
  id: number
  name: string
  slug: string
  attribute: {
    id: number
    name: string
    slug: string
  }
}

export interface IFile {
  id: number
  url: string
  type: string
}

export interface IProduct {
  id: number
  name: string
  slug: string
  price: number
  shortDesc?: string
  desc?: any
  images: IFile[]
  categories?: ICategory[]
  attrs?: IProductAttribute[]
  comments?: IComment[]
  tags?: string[]
  metaTitle?: string
  metaDesc?: string
  metaRobots?: string
  metaKeywords?: string
  updatedAt: string,
  createdAt: string
}