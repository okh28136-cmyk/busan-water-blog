"use client";

import Link from "next/link";
import { useState } from "react";

// 임시 데이터
const DUMMY_POSTS = [
  { id: "1", title: "해운대 사무실 생수 배달, 왜 부산생수일까요?", category: "Service", date: "2024-10-30" },
  { id: "2", title: "건강한 생활을 위한 물 섭취 가이드", category: "Health", date: "2024-10-20" },
  { id: "3", title: "부산의 깨끗한 수원지를 찾아서", category: "About", date: "2024-10-15" },
];

export default function AdminDashboard() {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  const handleDelete = (id: string) => {
    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      setPosts(posts.filter(post => post.id !== id));
      // 파이어베이스 연동 시 실제 DB 삭제 로직 추가
    }
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2">게시물 관리</h1>
          <p className="text-on-surface-variant">블로그 게시물을 작성하고 관리할 수 있습니다.</p>
        </div>
        <Link 
          href="/admin/write" 
          className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:bg-primary-container transition-colors shadow-sm font-bold"
        >
          새 글 쓰기
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/30 text-secondary font-label-sm uppercase">
              <th className="p-4">제목</th>
              <th className="p-4 w-32">카테고리</th>
              <th className="p-4 w-32">작성일</th>
              <th className="p-4 w-32 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-outline-variant/20 hover:bg-surface-container/50 transition-colors">
                <td className="p-4 font-body-md text-on-background">{post.title}</td>
                <td className="p-4 text-on-surface-variant text-sm">{post.category}</td>
                <td className="p-4 text-on-surface-variant text-sm">{post.date}</td>
                <td className="p-4 flex justify-center gap-2">
                  <Link href={`/admin/write?id=${post.id}`} className="text-primary hover:underline text-sm px-2">수정</Link>
                  <button onClick={() => handleDelete(post.id)} className="text-error hover:underline text-sm px-2">삭제</button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                  작성된 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
