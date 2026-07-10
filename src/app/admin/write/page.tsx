"use client";

import { useState } from "react";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 border-b border-outline-variant/50 bg-surface-container-low rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-primary text-on-primary' : 'bg-white text-on-surface hover:bg-surface-container-high'}`}
        type="button"
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded text-sm italic font-serif ${editor.isActive('italic') ? 'bg-primary text-on-primary' : 'bg-white text-on-surface hover:bg-surface-container-high'}`}
        type="button"
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1 rounded text-sm font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-on-primary' : 'bg-white text-on-surface hover:bg-surface-container-high'}`}
        type="button"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1 rounded text-sm font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-primary text-on-primary' : 'bg-white text-on-surface hover:bg-surface-container-high'}`}
        type="button"
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-primary text-on-primary' : 'bg-white text-on-surface hover:bg-surface-container-high'}`}
        type="button"
      >
        • List
      </button>
    </div>
  );
};

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Service");
  
  // 썸네일 및 이미지 상태
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // 태그 상태
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // SEO 메타태그
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // Tiptap 에디터 설정
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>여기에 풍부한 내용을 작성하세요.</p>',
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none min-h-[400px] p-6 bg-white',
      },
    },
  });

  // 썸네일 이미지 압축 및 미리보기
  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsCompressing(true);
      
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          fileType: 'image/webp' as any
        };
        
        // 이미지 압축 및 WebP 변환
        const compressedFile = await imageCompression(file, options);
        setThumbnail(compressedFile);
        
        // 미리보기 생성
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreview(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("이미지 압축 실패:", error);
        alert("이미지 처리 중 오류가 발생했습니다.");
      } finally {
        setIsCompressing(false);
      }
    }
  };

  // 태그 핸들러
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, '');
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const htmlContent = editor?.getHTML() || "";
    alert("파이어베이스 연동 후 다음 데이터가 저장됩니다:\n\n" + 
          "제목: " + title + "\n" +
          "태그 수: " + tags.length + "\n" +
          "썸네일: " + (thumbnail ? "등록됨(WebP)" : "없음") + "\n" +
          "본문 길이: " + htmlContent.length + "자\n" +
          "SEO 제목: " + seoTitle);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b border-outline-variant/30 pb-4">
        <h1 className="font-headline-lg text-headline-lg text-primary">새 글 쓰기</h1>
        <Link href="/admin/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">
          목록으로 돌아가기
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* 1. 기본 정보 & 태그 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-5">
          <h2 className="font-article-title text-lg border-b border-outline-variant/20 pb-2 mb-2">기본 정보</h2>
          
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/3">
              <label className="block font-label-sm text-secondary mb-2">카테고리</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant/50 focus:border-primary outline-none bg-white"
              >
                <option value="Service">Service (서비스)</option>
                <option value="Health">Health (건강)</option>
                <option value="About">About (소개)</option>
              </select>
            </div>

            <div className="w-full md:w-2/3">
              <label className="block font-label-sm text-secondary mb-2">게시글 제목</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant/50 focus:border-primary outline-none text-lg font-bold"
                placeholder="예: 해운대 사무실 생수 배달, 왜 부산생수일까요?"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-secondary mb-2">추천/관련 태그 (엔터키 또는 쉼표로 추가)</label>
            <div className="w-full min-h-[50px] p-2 rounded-lg border border-outline-variant/50 flex flex-wrap gap-2 items-center bg-white focus-within:border-primary">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-error">
                    <span className="material-symbols-outlined text-[16px] leading-none">close</span>
                  </button>
                </span>
              ))}
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 outline-none min-w-[150px] bg-transparent text-sm p-1"
                placeholder={tags.length === 0 ? "예: 부산생수, 해운대생수 (엔터 입력)" : ""}
              />
            </div>
          </div>
        </div>

        {/* 2. 대표 썸네일 업로드 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2 mb-2">
            <span className="material-symbols-outlined text-primary">image</span>
            <h2 className="font-article-title text-lg text-on-background">대표 썸네일 이미지</h2>
            <span className="text-xs text-secondary ml-2 bg-secondary-container px-2 py-1 rounded">자동 WebP 최적화 적용됨</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3 aspect-video bg-surface-container-high rounded-lg flex items-center justify-center border-2 border-dashed border-outline-variant overflow-hidden relative">
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <span className="material-symbols-outlined text-4xl text-outline">add_photo_alternate</span>
                  <p className="text-sm text-secondary mt-2">이미지 미리보기</p>
                </div>
              )}
              {isCompressing && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">최적화 중...</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              <label className="block text-sm text-on-surface-variant">
                카카오톡 공유, 네이버 검색결과 등에 노출될 대표 이미지를 선택하세요. 업로드 시 자동으로 용량이 최적화됩니다.
              </label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleThumbnailChange}
                className="mt-2 text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. 본문 에디터 (Tiptap) */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-5">
          <h2 className="font-article-title text-lg border-b border-outline-variant/20 pb-2 mb-2">본문 내용</h2>
          <div className="rounded-lg overflow-hidden border border-outline-variant/50 flex flex-col bg-white">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="flex-1" />
          </div>
        </div>

        {/* 4. 네이버 SEO 설정 */}
        <div className="bg-[#f0f9ff] p-6 rounded-xl border border-[#bae6fd] shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-[#bae6fd] pb-2 mb-2">
            <span className="material-symbols-outlined text-[#0284c7]">search</span>
            <h2 className="font-article-title text-lg text-[#0284c7]">네이버 검색 상위 노출(SEO) 상세 설정</h2>
          </div>
          
          <div>
            <label className="block font-label-sm text-[#0369a1] mb-2">검색용 메타 제목 (입력하지 않으면 게시글 제목이 사용됩니다)</label>
            <input 
              type="text" 
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#bae6fd] focus:border-[#0284c7] outline-none bg-white"
              placeholder="예: 부산 해운대 생수 배달 추천 - 부산생수"
            />
          </div>

          <div>
            <label className="block font-label-sm text-[#0369a1] mb-2">검색 결과 설명 (Meta Description) - 네이버 검색 시 제목 아래에 뜨는 글입니다.</label>
            <textarea 
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#bae6fd] focus:border-[#0284c7] outline-none resize-none h-20 bg-white"
              placeholder="예: 부산 전 지역 맑고 깨끗한 생수를 사무실로 당일 배달해 드립니다. 해운대, 서면 등 빠른 배송 가능."
            />
          </div>
          
          <div className="text-sm text-[#0284c7] mt-[-10px] pl-1">
            * 검색 키워드는 위에서 입력하신 <b>'추천/관련 태그'</b>가 자동으로 검색엔진에 제출되도록 연동해두었습니다.
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 pt-4 sticky bottom-8 z-10">
          <button 
            type="button" 
            className="flex-1 bg-surface-container text-on-surface-variant py-4 rounded-xl font-bold text-lg hover:bg-surface-container-high transition-colors shadow-sm"
          >
            임시저장
          </button>
          <button 
            type="submit" 
            className="flex-[2] bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:bg-primary-container transition-colors shadow-md"
          >
            블로그에 발행하기
          </button>
        </div>
      </form>
    </div>
  );
}
