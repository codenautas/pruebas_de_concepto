<h4>Tabla formato showdown</h4>
| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |

<h4>Tabla formato github</h4>
tabla 1    | min | max | return
-----------|-----|-----|--------------
execute    |  -  |  -  | result.rowCount
fetchAll   |  0  | inf | result.rows, result.rowCount
fetchUniqueValue | 1 | 1 | result.value
fetchUniqueRow | 1 | 1 | result.row
fetchOneRowIfExists | 0 | 1 | result.row, result.rowCount

