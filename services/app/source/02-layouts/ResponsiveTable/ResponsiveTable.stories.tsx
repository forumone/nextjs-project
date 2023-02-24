import { ComponentMeta, ComponentStory } from '@storybook/react';
import ResponsiveTable from './ResponsiveTable';

const settings = {
  title: 'Layouts/Responsive Table',
  component: ResponsiveTable,
} as ComponentMeta<typeof ResponsiveTable>;

const Template: ComponentStory<typeof ResponsiveTable> = args => (
  <ResponsiveTable {...args}>
    <table>
      <caption id="tablecaption01">Table caption</caption>
      <thead>
        <tr>
          <th>Table Heading A</th>
          <th>Table Heading B</th>
          <th>Table Heading C</th>
          <th>Table Heading D</th>
          <th>Table Heading E</th>
          <th>Table Heading F</th>
          <th>Table Heading G</th>
          <th>Table Heading H</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Table Footer A</th>
          <th>Table Footer B</th>
          <th>Table Footer C</th>
          <th>Table Footer D</th>
          <th>Table Footer E</th>
          <th>Table Footer F</th>
          <th>Table Footer G</th>
          <th>Table Footer H</th>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>Table Cell A1</td>
          <td>Table Cell B1</td>
          <td>Table Cell C1</td>
          <td>Table Cell D1</td>
          <td>Table Cell E1</td>
          <td>Table Cell F1</td>
          <td>Table Cell G1</td>
          <td>Table Cell H1</td>
        </tr>
        <tr>
          <td>Table Cell A2</td>
          <td>Table Cell B2</td>
          <td>Table Cell C2</td>
          <td>Table Cell D2</td>
          <td>Table Cell E2</td>
          <td>Table Cell F2</td>
          <td>Table Cell G2</td>
          <td>Table Cell H2</td>
        </tr>
        <tr>
          <td>Table Cell A3</td>
          <td>Table Cell B3</td>
          <td>Table Cell C3</td>
          <td>Table Cell D3</td>
          <td>Table Cell E3</td>
          <td>Table Cell F3</td>
          <td>Table Cell G3</td>
          <td>Table Cell H3</td>
        </tr>
        <tr>
          <td>Table Cell A4</td>
          <td>Table Cell B4</td>
          <td>Table Cell C4</td>
          <td>Table Cell D4</td>
          <td>Table Cell E4</td>
          <td>Table Cell F4</td>
          <td>Table Cell G4</td>
          <td>Table Cell H4</td>
        </tr>
      </tbody>
    </table>
  </ResponsiveTable>
);

const _ResponsiveTable = Template.bind({});
_ResponsiveTable.args = {
  labelledBy: 'tablecaption01',
};

export default settings;
export { _ResponsiveTable };