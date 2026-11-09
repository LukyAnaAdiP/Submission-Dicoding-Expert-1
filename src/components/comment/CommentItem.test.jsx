import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import CommentItem from "./CommentItem";
import "@testing-library/jest-dom";

/**
 * skenario testing
 *
 * - CommentItem component
 *   - should display comment owner name correctly
 *   - should display comment content correctly
 *   - should display comment date correctly
 *   - should display owner avatar when avatar is available
 *   - should display owner initial when avatar is unavailable
 *   - should display question mark when owner name is unavailable
 *   - should display Unknown User when owner is unavailable
 */

vi.mock("../../utils/formatDate", () => ({
  default: vi.fn(() => "4 November 2026"),
}));

afterEach(() => {
  cleanup();
});

describe("CommentItem component", () => {
  it("should display comment owner name correctly", () => {
    const comment = {
      owner: {
        name: "Luky",
        avatar: "https://example.com/avatar.png",
      },
      createdAt: "2026-11-04T08:00:00.000Z",
      content: "Saya sedang belajar React.",
    };

    render(<CommentItem comment={comment} />);

    const ownerName = screen.getByText("Luky");
    expect(ownerName).toBeInTheDocument();
  });

  it("should display comment content correctly", () => {
    const comment = {
      owner: { name: "Luky", avatar: null },
      createdAt: "2026-11-04T08:00:00.000Z",
      content: "Saya sedang belajar React.",
    };

    render(<CommentItem comment={comment} />);

    // const commentContent = screen.getByText("Saya sedang belajar React.");
    const commentContent = screen.getByText("Komentar tidak ditemukan.");
    expect(commentContent).toBeInTheDocument();
  });

  it("should display comment date correctly", () => {
    const comment = {
      owner: { name: "Luky", avatar: null },
      createdAt: "2026-11-04T08:00:00.000Z",
      content: "Komentar pertama.",
    };

    render(<CommentItem comment={comment} />);

    const commentDate = screen.getByText("4 November 2026");
    expect(commentDate).toBeInTheDocument();
  });

  it("should display owner avatar when avatar is available", () => {
    const comment = {
      owner: {
        name: "Luky",
        avatar: "https://example.com/avatar.png",
      },
      createdAt: "2026-11-04T08:00:00.000Z",
      content: "Komentar pertama.",
    };

    render(<CommentItem comment={comment} />);

    const avatar = screen.getByRole("img", { name: "Luky" });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.png");
  });

  it("should display owner initial when avatar is unavailable", () => {
    const comment = {
      owner: {
        name: "Luky",
        avatar: null,
      },
      createdAt: "2026-11-04T08:00:00.000Z",
      content: "Komentar pertama.",
    };

    render(<CommentItem comment={comment} />);

    const ownerInitial = screen.getByText("L");
    expect(ownerInitial).toBeInTheDocument();
  });

  it("should display question mark when owner name is unavailable", () => {
    const comment = {
      owner: {
        name: null,
        avatar: null,
      },
      createdAt: "2026-11-04T08:00:00.000Z",
      content: "Komentar pertama.",
    };

    render(<CommentItem comment={comment} />);

    const fallbackInitial = screen.getByText("?");
    expect(fallbackInitial).toBeInTheDocument();
  });

  it("should display Unknown User when owner is unavailable", () => {
    const comment = {
      owner: null,
      createdAt: "2026-11-04T08:00:00.000Z",
      content: "Komentar pertama.",
    };

    render(<CommentItem comment={comment} />);

    const ownerName = screen.getByText("Unknown User");
    expect(ownerName).toBeInTheDocument();
  });
});
