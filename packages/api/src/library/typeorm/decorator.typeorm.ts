import { Column, ColumnOptions, ValueTransformer } from 'typeorm';
import { deepmerge } from 'deepmerge-ts';

export function ForeignColumn(options?: ColumnOptions): PropertyDecorator {
  return Column(deepmerge({ type: 'uuid' }, options || {}));
}

export function BooleanColumn(options?: ColumnOptions): PropertyDecorator {
  const columnOptions: ColumnOptions = deepmerge({ type: 'smallint' }, options || {});
  if (columnOptions.default) {
    columnOptions.default = columnOptions.default ? 1 : 0;
  } else {
    columnOptions.default = 0;
  }

  columnOptions.transformer = new (class implements ValueTransformer {
    to(value?: boolean): number {
      return value ? 1 : 0;
    }

    from(value?: number): boolean {
      return value === 1;
    }
  })();

  return Column(columnOptions);
}

export function StringColumn(options?: ColumnOptions): PropertyDecorator {
  return Column(deepmerge({ type: 'varchar' }, options || {}));
}

export function NumberColumn(options?: ColumnOptions): PropertyDecorator {
  return Column(deepmerge({ type: 'int' }, options || {}));
}

export function JsonColumn(options?: ColumnOptions): PropertyDecorator {
  return Column(deepmerge({ type: 'jsonb' }, options || {}));
}

export function DateColumn(options?: ColumnOptions): PropertyDecorator {
  return Column(deepmerge({ type: 'timestamp' }, options || {}));
}
