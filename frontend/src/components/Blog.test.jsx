import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import Blog from './Blog';
import BlogForm from './BlogForm';

describe('renders test', () => {
  test('should render blog title and author', () => {
    const user = {
      username: 'Lumin',
    };
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Albert Wesker',
      user: {
        username: 'Lumin',
      },
    };

    render(<Blog blog={blog} user={user} />);

    // Search content that match condition
    const element = screen.getByTestId('testblog1');
    // log test content on console
    screen.debug(element);
    // element should exists.
    expect(element).toBeDefined();
  });
});

describe('button tests', () => {
  const user = {
    username: 'Lumin',
  };
  const blog = {
    id: '765b49cq6635z349gt',
    title: 'Component testing is done with react-testing-library',
    author: 'Albert Wesker',
    url: 'https://TriCell.com/test',
    likes: 1035,
    user: {
      username: 'Lumin',
      id: '65eeef3f83cbe9ccf9e034f4',
    },
  };

  test('click the button once should show details', async () => {
    const { container } = render(<Blog blog={blog} user={user} />);

    const userSetup = userEvent.setup();
    const viewButton = screen.getByTestId('viewButton');
    await userSetup.click(viewButton);

    const element = container.getElementsByClassName('blog-layout').container;
    screen.debug(element);
    const likeButton = screen.getByTestId('testLikeButton');

    expect(likeButton !== undefined);
  });

  test('click like button twice should call mock function twice', async () => {
    let count = blog.likes;

    const handleClick = () => (count += 1);
    const mock = vi.fn().mockImplementation(handleClick);

    render(
      <button data-testid="testLikeButton" onClick={mock}>
        like
      </button>
    );

    const userSetup = userEvent.setup();
    const toggleElement = screen.getByTestId('testLikeButton');
    await userSetup.dblClick(toggleElement);

    expect(mock.mock.calls).toHaveLength(2);
  });
});

describe('Testing the forms', () => {
  const blog = {
    title: 'There is no point to hiding!',
    author: 'Albert Wesker',
    url: 'https://residentevil.fandom.com/wiki/Resident_Evil_5',
  };

  test('should correctly create new blog', async () => {
    const addBlog = vi.fn();

    render(<BlogForm onSubmit={addBlog} />);

    screen.getByTestId('testForm').onsubmit = addBlog;

    fireEvent.change(screen.getByPlaceholderText('input title'), {
      target: { value: blog.title },
    });
    fireEvent.change(screen.getByPlaceholderText('input author'), {
      target: { value: blog.author },
    });
    fireEvent.change(screen.getByPlaceholderText('input url'), {
      target: { value: blog.url },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'create' }));

    screen.debug();

    // Check if mock function called
    expect(addBlog.mock.calls).toHaveLength(1);
  });
});
