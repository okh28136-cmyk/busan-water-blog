"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts: Post[] = [];
      querySnapshot.forEach((document) => {
        const data = document.data();
        const date = data.createdAt ? new Date(data.createdAt.toMillis()).toISOString().split('T')[0] : "방금 전";
        fetchedPosts.push({
          id: document.id,
          title: data.title,
          category: data.category,
          date: date,
        });
      });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("정말로 이 게시글을 삭제하시겠습니까? 데이터베이스에서 영구 삭제됩니다.")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts(posts.filter(post => post.id !== id));
        alert("게시글이 삭제되었습니다.");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
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
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                  게시글을 불러오는 중입니다...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                  작성된 게시글이 없습니다. 우측 상단의 '새 글 쓰기'를 눌러 첫 글을 작성해보세요.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-outline-variant/20 hover:bg-surface-container/50 transition-colors">
                  <td className="p-4 font-body-md text-on-background">{post.title}</td>
                  <td className="p-4 text-on-surface-variant text-sm">{post.category}</td>
                  <td className="p-4 text-on-surface-variant text-sm">{post.date}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => alert('기능 준비 중입니다. 먼저 새 글을 지우고 새로 써보세요!')} className="text-primary hover:underline text-sm px-2">수정</button>
                    <button onClick={() => handleDelete(post.id)} className="text-error hover:underline text-sm px-2">삭제</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
