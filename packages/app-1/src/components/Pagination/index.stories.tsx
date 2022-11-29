import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { usePagination } from './hooks';

import Pagination, { PlainPagination } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Pagination',
  component: Pagination
} as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  pageSize: 7,
  className: 'flex flex-gap-2',
  itemClassName: 'p-4 hover:underline',
  activeItemClassName: 'bg-blue-70 bg-blue-700 text-white disabled',
  count: 50
};

export const ExternalCallback: ComponentStory<typeof Pagination> = (props) => {
  const [params, setParams] = useState({});
  return (
    <section className="">
      <Pagination onChange={setParams} {...props} />
      <div className="">
        <pre>{JSON.stringify(props, null, 2)}</pre>
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </div>
    </section>
  );
};
ExternalCallback.args = {
  ...Basic.args,
  page: 2
};

export const ZeroItems: ComponentStory<typeof Pagination> = (props) => (
  <>
    <pre>isHiddenIfOnePage=true to force-display paginator</pre>
    <ExternalCallback {...props} />
  </>
);
ZeroItems.args = {
  ...ExternalCallback.args,
  isHiddenIfOnePage: false,
  count: 0
};

export const TwoItems = ExternalCallback.bind({});
TwoItems.args = {
  ...ExternalCallback.args,
  count: 2,
  pageSize: 1
};

export const MultiplePaginators: ComponentStory<typeof Pagination> = (props) => {
  const [params, setParams] = useState(props);

  return (
    <section className="flex flex-col">
      <Pagination
        onChange={(params) => {
          setParams((v) => ({
            ...v,
            ...params
          }));
        }}
        {...params}
      />
      <Pagination
        onChange={(params) => {
          setParams((v) => ({
            ...v,
            ...params
          }));
        }}
        {...params}
      />
      <div className="">
        <pre>{JSON.stringify(props, null, 2)}</pre>
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </div>
    </section>
  );
};
MultiplePaginators.args = {
  ...Basic.args,
  page: 2
};

export const UsePagination: ComponentStory<typeof Pagination> = (props) => {
  const [counter, setCounter] = useState(0);
  const extraProps = usePagination({
    ...props,
    onChange: () => setCounter((v) => ++v)
  });

  return (
    <section className="flex flex-col">
      <PlainPagination {...props} {...extraProps} />
      <div className="">
        <pre>perform filtering or pagination to see counter go up - {counter}</pre>
        <pre>returned props from hook</pre>
        <pre>{JSON.stringify(extraProps, null, 2)}</pre>
      </div>
    </section>
  );
};
UsePagination.args = {
  ...Basic.args,
  page: 2
};

export const UsePaginationWithPageSizes: ComponentStory<typeof Pagination> = (props) => {
  const [counter, setCounter] = useState(0);
  const extraProps = usePagination({
    ...props,
    onChange: () => setCounter((v) => ++v)
  });

  return (
    <section className="flex flex-col">
      {props.pageSize && (
        <div>
          <label htmlFor="pageSize">page size</label>
          <select
            id="pageSize"
            value={Number(extraProps.pageSize)}
            onChange={(e) => extraProps.setPageSize(Number(e.currentTarget.value))}
          >
            {extraProps.pageSizes.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
      )}
      <PlainPagination {...props} {...extraProps} />
      <div className="">
        <pre>perform filtering or pagination to see counter go up - {counter}</pre>
        <pre>returned props from hook</pre>
        <pre>{JSON.stringify(extraProps, null, 2)}</pre>
      </div>
    </section>
  );
};
UsePaginationWithPageSizes.args = {
  ...Basic.args,
  page: 2,
  count: 50000,
  pageSize: 9999
};
