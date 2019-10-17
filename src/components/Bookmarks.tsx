import * as React from 'react'
import { SchemaAndLanguage } from '../models/SchemaAndLanguage'
import ListItemBookmark from './ListItemBookmark'

interface Props {
  schemaAndLanguage: SchemaAndLanguage
  bookmarkedSchemaAndLanguages: SchemaAndLanguage[]
  createBookmark: (schemaAndLanguage: SchemaAndLanguage) => void
  destroyBookmark: (index: number) => void
}

const Bookmarks: React.FC<Props> = ({
  schemaAndLanguage,
  bookmarkedSchemaAndLanguages,
  createBookmark,
  destroyBookmark,
}: Props) => {
  return (
    <div className="box">
      <div className="bookmarksSectionTitle">
        <div className="section-title">Bookmarks</div>
        <div
          className="icon icon--plus cursor"
          onClick={() => {
            createBookmark(schemaAndLanguage)
          }}
        />
      </div>
      {bookmarkedSchemaAndLanguages &&
        bookmarkedSchemaAndLanguages.map((item, index) => {
          return (
            <ListItemBookmark
              key={index}
              schemaAndLanguage={item}
              destroy={() => {
                destroyBookmark(index)
              }}
            />
          )
        })}
    </div>
  )
}

export default Bookmarks
