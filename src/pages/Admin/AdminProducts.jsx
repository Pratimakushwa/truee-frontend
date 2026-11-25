

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import Toast from '../../components/Toast';
// import * as XLSX from 'xlsx';
// import {
//   Plus,
//   Trash2,
//   ImagePlus,
//   Grid3X3,
//   List,
//   Search,
//   Package,
//   Edit2,
//   X,
//   ChevronDown,
//   Tag,
//   Boxes,
//   IndianRupee,
//   Star,
//   Zap,
//   Clock,
//   Video,
//   ListChecks,
//   CheckSquare,
//   ChevronLeft,
//   ChevronRight,
//   LayoutTemplate,
//   Download
// } from 'lucide-react';

// export default function AdminProducts() {
//   const [products, setProducts] = useState([]);

//   const [bulkSpecsText, setBulkSpecsText] = useState('');
//   const [bulkHighlightsText, setBulkHighlightsText] = useState('');

//   const applyBulkRows = (field, text, clearText) => {
//     const lines = text
//       .split(/\r?\n/)
//       .map(line => line.trim())
//       .filter(Boolean);

//     if (!lines.length) {
//       alert('Pehle data paste karo.');
//       return;
//     }

//     const rows = [];

//     for (let i = 0; i < lines.length; i++) {
//       const splitAt = lines[i].indexOf(':');
//       const key = lines[i].slice(0, splitAt).trim();
//       const value = lines[i].slice(splitAt + 1).trim();

//       if (splitAt <= 0 || !key || !value) {
//         alert(`Line ${i + 1}: Name: Value format use karo.`);
//         return;
//       }

//       rows.push(
//         field === 'techSpecs'
//           ? {
//               category: key,
//               description: value,
//               details: [value]
//             }
//           : {
//               iconName: key,
//               title: value
//             }
//       );
//     }

//     setFormData(prev => ({
//       ...prev,
//       [field]: [
//         ...(prev[field] || []).filter(row =>
//           field === 'techSpecs'
//             ? row.category?.trim() ||
//               row.description?.trim() ||
//               row.details?.length
//             : row.iconName?.trim() || row.title?.trim()
//         ),
//         ...rows
//       ]
//     }));

//     clearText('');
//   };

//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');

//   const [toastMessage, setToastMessage] = useState(null);

//   const showToast = (type, message) => {
//     setToastMessage({ type, message });
//   };

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     discountPrice: 0,
//     category: '',
//     brand: '',
//     stock: 'Available',
//     isActive: true,
//     flashDeal: {
//       isActive: false,
//       dealPrice: '',
//       startTime: '',
//       endTime: ''
//     },
//     promotionalVideo: {
//       videoUrl: '',
//       thumbnailUrl: ''
//     },
//     inTheBox: [''],
//     techSpecs: [],
//     highlights: [],
//     boughtTogether: [],
//     lifestyleImages: []
//   });

//   // Variants state
//   const [variants, setVariants] = useState([]);

//   const filteredProducts = products.filter(p => {
//     const matchesSearch =
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.brand?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       filterCategory === 'all' || p.category === filterCategory;

//     return matchesSearch && matchesCategory;
//   });

//   const categories = [...new Set(products.map(p => p.category))];

//  const handleExportExcel = () => {
//     const list = filteredProducts.length ? filteredProducts : products;
//     if (!list.length) return;

//     const rows = list.map((p, i) => {
//       const remarks = [];

//       const productImgCount = Array.isArray(p.images) ? p.images.length : 0;
//       const variantList = Array.isArray(p.variants) ? p.variants : [];
//       const variantImgCount = variantList.reduce(
//         (sum, v) => sum + (Array.isArray(v?.images) ? v.images.length : 0),
//         0
//       );
//       const totalImages = productImgCount + variantImgCount;

//       if (!p.promotionalVideo?.videoUrl?.trim()) {
//         remarks.push('No Video');
//       }

//       if (totalImages === 0) {
//         remarks.push('No Images');
//       } else if (totalImages < 2) {
//         remarks.push(`Low Images (${totalImages})`);
//       }

//       if (
//         p.price === undefined ||
//         p.price === null ||
//         p.price === '' ||
//         Number(p.price) <= 0
//       ) {
//         remarks.push('No Price');
//       }

//       if (!variantList.length) {
//         remarks.push('No Variants');
//       } else if (variantList.some(v => !v?.color?.trim())) {
//         remarks.push('Missing Color');
//       }

//       return {
//         'S.No': i + 1,
//         'Name': p.name || '',
//         'Brand': p.brand || '',
//         'Category': p.category || '',
//         'Price': p.price ?? '',
//         'Discount Price': p.discountPrice ?? '',
//         'Stock': p.stock || '',
//         'Active': p.isActive ? 'Yes' : 'No',
//         'Images Count': totalImages,
//         'Video': p.promotionalVideo?.videoUrl ? 'Yes' : 'No',
//         'Remarks': remarks.length ? remarks.join(' | ') : 'Complete',
//         'Description': String(p.description || '').replace(/<[^>]*>/g, ' ').trim(),
//       };
//     });

//     const ws = XLSX.utils.json_to_sheet(rows);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Products');
//     XLSX.writeFile(wb, 'products.xlsx');
//   };
//   const fetchProducts = async () => {
//     try {
//       const { data } = await axiosInstance.get('/products/admin/products');
//       setProducts(data.products);
//     } catch (error) {
//       showToast(
//         'error',
//         error.response?.data?.message || 'Failed to load products'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleFlashDealChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       flashDeal: {
//         ...prev.flashDeal,
//         [name]: type === 'checkbox' ? checked : value
//       }
//     }));
//   };

//   const handleVideoChange = (e) => {
//     const { name, value } = e.target;

//     setFormData(prev => ({
//       ...prev,
//       promotionalVideo: {
//         ...prev.promotionalVideo,
//         [name]: value
//       }
//     }));
//   };

//   const handleArrayChange = (field, index, key, value) => {
//     const updated = [...formData[field]];

//     if (key === null) updated[index] = value;
//     else updated[index][key] = value;

//     setFormData({
//       ...formData,
//       [field]: updated
//     });
//   };

//   const addArrayItem = (field, emptyItem) => {
//     setFormData({
//       ...formData,
//       [field]: [...formData[field], emptyItem]
//     });
//   };

//   const removeArrayItem = (field, index) => {
//     setFormData({
//       ...formData,
//       [field]: formData[field].filter((_, i) => i !== index)
//     });
//   };

//   const handleLifestyleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     const newImages = files.map(f => ({
//       type: 'new',
//       file: f,
//       url: URL.createObjectURL(f),
//       title: '',
//       description: ''
//     }));

//     setFormData(prev => ({
//       ...prev,
//       lifestyleImages: [...prev.lifestyleImages, ...newImages]
//     }));
//   };

//   const handleLifestyleTextFieldChange = (index, field, value) => {
//     const updated = [...formData.lifestyleImages];
//     updated[index][field] = value;

//     setFormData(prev => ({
//       ...prev,
//       lifestyleImages: updated
//     }));
//   };

//   const removeLifestyleImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       lifestyleImages: prev.lifestyleImages.filter((_, i) => i !== index)
//     }));
//   };

//   const moveLifestyleImage = (index, direction) => {
//     const updated = [...formData.lifestyleImages];
//     const newIndex = index + direction;

//     if (newIndex < 0 || newIndex >= updated.length) return;

//     [updated[index], updated[newIndex]] = [
//       updated[newIndex],
//       updated[index]
//     ];

//     setFormData(prev => ({
//       ...prev,
//       lifestyleImages: updated
//     }));
//   };

//   // Variants Handlers
//   const addVariant = () => {
//     setVariants([
//       ...variants,
//       {
//         color: '',
//         size: '',
//         stock: 'Available',
//         price: '',
//         images: []
//       }
//     ]);
//   };

//   const removeVariant = (index) => {
//     setVariants(variants.filter((_, i) => i !== index));
//   };

//   const handleVariantChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index][field] = value;
//     setVariants(updated);
//   };

//   const handleVariantImageChange = (index, files) => {
//     const updated = [...variants];

//     const newFileObjects = Array.from(files).map(f => ({
//       type: 'new',
//       file: f,
//       url: URL.createObjectURL(f)
//     }));

//     updated[index].images = [
//       ...(updated[index].images || []),
//       ...newFileObjects
//     ];

//     setVariants(updated);
//   };

//   const moveImage = (variantIndex, imageIndex, direction) => {
//     const updated = [...variants];
//     const imagesArray = updated[variantIndex].images;
//     const newIndex = imageIndex + direction;

//     if (newIndex < 0 || newIndex >= imagesArray.length) return;

//     [imagesArray[imageIndex], imagesArray[newIndex]] = [
//       imagesArray[newIndex],
//       imagesArray[imageIndex]
//     ];

//     setVariants(updated);
//   };

//   const removeVariantImage = (variantIndex, imageIndex) => {
//     const updated = [...variants];

//     updated[variantIndex].images = updated[variantIndex].images.filter(
//       (_, i) => i !== imageIndex
//     );

//     setVariants(updated);
//   };

//   const handleOpenModal = async (product = null) => {
//     setBulkSpecsText('');
//     setBulkHighlightsText('');
//     setVariants([]);

//     if (product) {
//       setEditMode(true);
//       setCurrentId(product._id);

//       try {
//         const { data } = await axiosInstance.get(`/products/${product._id}`);
//         const fullProd = data.product;

//         const formatDateTime = (dateString) =>
//           dateString
//             ? new Date(dateString).toISOString().slice(0, 16)
//             : '';

//         setFormData({
//           name: fullProd.name,
//           description: fullProd.description,
//           price: fullProd.price || '',
//           discountPrice: fullProd.discountPrice || 0,
//           category: fullProd.category,
//           brand: fullProd.brand,
//           stock: fullProd.stock,
//           isActive: fullProd.isActive,
//           flashDeal: {
//             isActive: fullProd.flashDeal?.isActive || false,
//             dealPrice: fullProd.flashDeal?.dealPrice || '',
//             startTime: formatDateTime(fullProd.flashDeal?.startTime),
//             endTime: formatDateTime(fullProd.flashDeal?.endTime)
//           },
//           promotionalVideo: fullProd.promotionalVideo || {
//             videoUrl: '',
//             thumbnailUrl: ''
//           },
//           inTheBox: fullProd.inTheBox?.length ? fullProd.inTheBox : [''],
//           techSpecs: fullProd.techSpecs?.map(t => ({
//             category: t.category || '',
//             description: t.description || '',
//             details: t.details || []
//           })) || [],
//           highlights: fullProd.highlights || [],
//           boughtTogether: fullProd.boughtTogether
//             ? fullProd.boughtTogether.map(item => item._id || item)
//             : [],
//           lifestyleImages: fullProd.lifestyleImages
//             ? fullProd.lifestyleImages.map(item => ({
//                 type: 'existing',
//                 data: item,
//                 url: item.image?.url || item.url || item,
//                 title: item.title || '',
//                 description: item.description || ''
//               }))
//             : []
//         });

//         if (fullProd.variants?.length > 0) {
//           setVariants(
//             fullProd.variants.map(v => ({
//               color: v.color || '',
//               size: v.size || '',
//               stock: v.stock || '',
//               price: v.price || '',
//               images: v.images
//                 ? v.images.map(img => ({
//                     type: 'existing',
//                     data: img,
//                     url: img.url
//                   }))
//                 : []
//             }))
//           );
//         }
//       } catch (e) {
//         showToast('error', 'Failed to fetch full details');
//       }
//     } else {
//       setEditMode(false);
//       setCurrentId(null);

//       setFormData({
//         name: '',
//         description: '',
//         price: '',
//         discountPrice: 0,
//         category: '',
//         brand: '',
//         stock: 'Available',
//         isActive: true,
//         flashDeal: {
//           isActive: false,
//           dealPrice: '',
//           startTime: '',
//           endTime: ''
//         },
//         promotionalVideo: {
//           videoUrl: '',
//           thumbnailUrl: ''
//         },
//         inTheBox: [''],
//         techSpecs: [],
//         highlights: [],
//         boughtTogether: [],
//         lifestyleImages: []
//       });
//     }

//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const submitData = new FormData();

//       submitData.append('name', formData.name);
//       submitData.append('description', formData.description);
//       submitData.append('price', formData.price);
//       submitData.append('discountPrice', formData.discountPrice);
//       submitData.append('category', formData.category);
//       submitData.append('brand', formData.brand);
//       submitData.append('stock', formData.stock);
//       submitData.append('isActive', formData.isActive);

//       submitData.append('flashDeal', JSON.stringify(formData.flashDeal));
//       submitData.append(
//         'promotionalVideo',
//         JSON.stringify(formData.promotionalVideo)
//       );

//       submitData.append(
//         'inTheBox',
//         JSON.stringify(formData.inTheBox.filter(i => i.trim() !== ''))
//       );

//       submitData.append(
//         'techSpecs',
//         JSON.stringify(
//           formData.techSpecs.filter(t => t.category.trim() !== '')
//         )
//       );

//       submitData.append(
//         'highlights',
//         JSON.stringify(
//           formData.highlights.filter(h => h.title.trim() !== '')
//         )
//       );

//       let cleanBoughtTogether = [];

//       if (Array.isArray(formData.boughtTogether)) {
//         cleanBoughtTogether = formData.boughtTogether.filter(
//           id => typeof id === 'string' && id.length === 24
//         );
//       }

//       submitData.append(
//         'boughtTogether',
//         cleanBoughtTogether.length > 0
//           ? JSON.stringify(cleanBoughtTogether)
//           : ''
//       );

//       const lifestyleMeta = formData.lifestyleImages.map((imgObj) => ({
//         type: imgObj.type,
//         existingData: imgObj.type === 'existing' ? imgObj.data : null,
//         title: imgObj.title || '',
//         description: imgObj.description || ''
//       }));

//       submitData.append(
//         'lifestyleMetadata',
//         JSON.stringify(lifestyleMeta)
//       );

//       formData.lifestyleImages
//         .filter(img => img.type === 'new')
//         .forEach((imgObj) => {
//           submitData.append('lifestyleImages', imgObj.file);
//         });

//       // Handle Variants
//       const variantsData = variants.map((v) => {
//         const existingImgs = v.images
//           .filter(img => img.type === 'existing')
//           .map(img => img.data);

//         const newImgs = v.images.filter(img => img.type === 'new');

//         return {
//           color: v.color,
//           size: v.size,
//           stock: v.stock,
//           price: v.price,
//           existingImages: existingImgs || [],
//           hasNewImages: newImgs.length > 0
//         };
//       });

//       submitData.append('variants', JSON.stringify(variantsData));

//       let fileCount = 0;

//       variants.forEach((v, variantIdx) => {
//         const newFiles = v.images.filter(img => img.type === 'new');

//         if (newFiles.length > 0) {
//           newFiles.forEach((imgObj, imgIdx) => {
//             submitData.append(
//               `variantImages_${variantIdx}_${imgIdx}`,
//               imgObj.file
//             );
//             fileCount++;
//           });
//         }
//       });

//       const config = { headers: {} };

//       if (editMode) {
//         await axiosInstance.put(
//           `/products/admin/product/${currentId}`,
//           submitData,
//           config
//         );

//         showToast('success', 'Product updated successfully');
//       } else {
//         await axiosInstance.post(
//           '/products/admin/product/new',
//           submitData,
//           config
//         );

//         showToast('success', 'Product created successfully');
//       }

//       setShowModal(false);
//       fetchProducts();
//     } catch (error) {
//       console.error('Upload Error:', error);

//       showToast(
//         'error',
//         error.response?.data?.message || 'Action failed. Check console.'
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axiosInstance.delete(`/products/admin/product/${id}`);
//         showToast('success', 'Product deleted');
//         fetchProducts();
//       } catch (error) {
//         showToast(
//           'error',
//           error.response?.data?.message || 'Delete failed'
//         );
//       }
//     }
//   };

//   const handleToggleFeatured = async (id) => {
//     try {
//       const { data } = await axiosInstance.patch(
//         `/products/admin/product/${id}/feature`
//       );

//       setProducts(
//         products.map(p =>
//           p._id === id ? { ...p, isFeatured: data.isFeatured } : p
//         )
//       );

//       showToast('success', data.message);
//     } catch (error) {
//       showToast(
//         'error',
//         error.response?.data?.message ||
//           'Failed to update featured status'
//       );
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 bg-[#f8f9fa] min-h-screen">
//       <Toast
//         toast={toastMessage}
//         onClose={() => setToastMessage(null)}
//       />

//       {/* Header Section */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-serif text-[#C8A253] flex items-center gap-3">
//             <Package className="w-8 h-8" />
//             Product Inventory
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Manage your products, variants, and deals
//           </p>
//         </div>

//         <button
//           onClick={() => handleOpenModal()}
//           className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A253] to-[#b08d44] text-white font-semibold hover:shadow-lg hover:shadow-[#C8A253]/20 transition-all duration-300"
//         >
//           <Plus className="w-5 h-5" />
//           Add New Product
//         </button>
//       </div>

//       {/* Search & Filter Bar */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white shadow-sm rounded-xl border border-gray-200 p-4">
//         <div className="relative flex-1 w-full sm:max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//           <input
//             type="text"
//             placeholder="Search products by name or brand..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] transition-colors"
//           />
//         </div>

//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <div className="relative flex-1 sm:flex-none">
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] cursor-pointer w-full"
//             >
//               <option value="all">All Categories</option>
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>

//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//           </div>

//           <button
//             type="button"
//             onClick={handleExportExcel}
//             title="Export to Excel"
//             className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:border-[#C8A253] hover:text-[#C8A253] transition-colors"
//           >
//             <Download className="w-4 h-4" />
//           </button>

//           <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-md transition-colors ${
//                 viewMode === 'grid'
//                   ? 'bg-[#C8A253] text-white shadow-sm'
//                   : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
//               }`}
//             >
//               <Grid3X3 className="w-4 h-4" />
//             </button>

//             <button
//               onClick={() => setViewMode('table')}
//               className={`p-2 rounded-md transition-colors ${
//                 viewMode === 'table'
//                   ? 'bg-[#C8A253] text-white shadow-sm'
//                   : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
//               }`}
//             >
//               <List className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Products Display */}
//       {loading ? (
//         <div className="flex items-center justify-center py-20">
//           <div className="flex flex-col items-center gap-3">
//             <div className="w-10 h-10 border-2 border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-[#C8A253]">Loading inventory...</p>
//           </div>
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center">
//           <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600">
//             {searchTerm || filterCategory !== 'all'
//               ? 'No products match your search criteria'
//               : 'No products found. Start by adding a new product!'}
//           </p>
//         </div>
//       ) : viewMode === 'grid' ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {filteredProducts.map((p) => (
//             <div
//               key={p._id}
//               className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:border-[#C8A253]/50 hover:shadow-md transition-all duration-300"
//             >
//               <div className="relative aspect-square bg-gray-50 overflow-hidden border-b border-gray-100">
//                 {p.images?.[0]?.url ? (
//                   <img
//                     src={p.images[0].url}
//                     alt={p.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 ) : p.variants?.[0]?.images?.[0]?.url ? (
//                   <img
//                     src={p.variants[0].images[0].url}
//                     alt={p.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <ImagePlus className="w-12 h-12 text-gray-300" />
//                   </div>
//                 )}

//                 <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
//                   <div
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       p.isActive
//                         ? 'bg-green-100 text-green-700 border border-green-200'
//                         : 'bg-red-100 text-red-700 border border-red-200'
//                     }`}
//                   >
//                     {p.isActive ? 'Active' : 'Hidden'}
//                   </div>

//                   {p.isFeatured && (
//                     <div className="px-2 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-[#C8A253] text-white flex items-center gap-1 shadow-sm">
//                       <Star className="w-3 h-3 fill-current" />
//                       Featured
//                     </div>
//                   )}

//                   {p.flashDeal?.isActive && (
//                     <div className="px-2 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-red-500 text-white flex items-center gap-1 shadow-sm">
//                       <Zap className="w-3 h-3 fill-current" />
//                       Deal On
//                     </div>
//                   )}
//                 </div>

//                 {p.discountPrice > 0 && (
//                   <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-[#C8A253] text-white shadow-sm">
//                     {Math.round((p.discountPrice / p.price) * 100)}% OFF
//                   </div>
//                 )}
//               </div>

//               <div className="p-4">
//                 <div className="flex items-start justify-between gap-2 mb-2">
//                   <div>
//                     <h3 className="font-medium text-gray-900 line-clamp-1">
//                       {p.name}
//                     </h3>
//                     <p className="text-xs text-gray-500">{p.brand}</p>
//                   </div>

//                   <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600 border border-gray-200">
//                     {p.category}
//                   </span>
//                 </div>

//                 <div className="flex items-baseline gap-2 mb-3">
//                   <span className="text-lg font-bold text-[#C8A253]">
//                     {p.price
//                       ? `₹${
//                           p.discountPrice > 0
//                             ? p.price - p.discountPrice
//                             : p.price
//                         }`
//                       : 'Price on Request'}
//                   </span>

//                   {p.discountPrice > 0 && p.price && (
//                     <span className="text-sm text-gray-400 line-through">
//                       ₹{p.price}
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex gap-2 pt-3 border-t border-gray-100">
//                   <button
//                     onClick={() => handleToggleFeatured(p._id)}
//                     className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-colors border ${
//                       p.isFeatured
//                         ? 'bg-[#C8A253]/10 text-[#C8A253] border-[#C8A253]/30'
//                         : 'bg-gray-50 text-gray-500 border-gray-200 hover:text-gray-900 hover:bg-gray-100'
//                     }`}
//                   >
//                     <Star
//                       className={`w-4 h-4 ${
//                         p.isFeatured ? 'fill-[#C8A253]' : ''
//                       }`}
//                     />
//                   </button>

//                   <button
//                     onClick={() => handleOpenModal(p)}
//                     className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
//                   >
//                     <Edit2 className="w-3.5 h-3.5" />
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     className="flex items-center justify-center px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 hover:bg-red-100 transition-colors"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//           <table className="w-full text-left text-sm text-gray-600">
//             <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
//               <tr>
//                 <th className="px-6 py-4 font-medium">Product</th>
//                 <th className="px-6 py-4 font-medium">Category</th>
//                 <th className="px-6 py-4 font-medium">Price</th>
//                 <th className="px-6 py-4 font-medium">Deal Status</th>
//                 <th className="px-6 py-4 text-right font-medium">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredProducts.map((p) => (
//                 <tr
//                   key={p._id}
//                   className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       {p.images?.[0]?.url ? (
//                         <img
//                           src={p.images[0].url}
//                           alt={p.name}
//                           className="w-12 h-12 object-cover rounded-lg border border-gray-200"
//                         />
//                       ) : p.variants?.[0]?.images?.[0]?.url ? (
//                         <img
//                           src={p.variants[0].images[0].url}
//                           alt={p.name}
//                           className="w-12 h-12 object-cover rounded-lg border border-gray-200"
//                         />
//                       ) : (
//                         <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
//                           <ImagePlus className="w-5 h-5 text-gray-400" />
//                         </div>
//                       )}

//                       <div>
//                         <div className="flex items-center gap-2">
//                           <p className="font-medium text-gray-900">
//                             {p.name}
//                           </p>
//                           {p.isFeatured && (
//                             <Star className="w-3 h-3 text-[#C8A253] fill-[#C8A253]" />
//                           )}
//                         </div>
//                         <p className="text-xs text-gray-500">{p.brand}</p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-6 py-4">
//                     <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600">
//                       {p.category}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4">
//                     <span className="text-[#C8A253] font-semibold">
//                       {p.price
//                         ? `₹${
//                             p.discountPrice > 0
//                               ? p.price - p.discountPrice
//                               : p.price
//                           }`
//                         : 'On Request'}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4">
//                     {p.flashDeal?.isActive ? (
//                       <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-200">
//                         <Zap className="w-3 h-3 fill-current" />
//                         Active Deal
//                       </span>
//                     ) : (
//                       <span className="text-gray-400 text-xs">-</span>
//                     )}
//                   </td>

//                   <td className="px-6 py-4 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       <button
//                         onClick={() => handleToggleFeatured(p._id)}
//                         className={`p-2 rounded-lg transition-colors border ${
//                           p.isFeatured
//                             ? 'bg-[#C8A253]/10 text-[#C8A253] border-[#C8A253]/30'
//                             : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-900'
//                         }`}
//                       >
//                         <Star
//                           className={`w-4 h-4 ${
//                             p.isFeatured ? 'fill-[#C8A253]' : ''
//                           }`}
//                         />
//                       </button>

//                       <button
//                         onClick={() => handleOpenModal(p)}
//                         className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 hover:text-blue-700 transition-colors"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(p._id)}
//                         className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:text-red-700 transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-[#C8A253]/10">
//                   <Package className="w-5 h-5 text-[#C8A253]" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-serif text-[#C8A253]">
//                     {editMode ? 'Edit Product' : 'Add New Product'}
//                   </h2>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* BASIC INFO */}
//                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                   <h3 className="text-sm font-medium text-[#C8A253] mb-4 flex items-center gap-2">
//                     <Tag className="w-4 h-4" />
//                     Basic Information
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Product Name *
//                       </label>
//                       <input
//                         required
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] transition-all"
//                       />
//                     </div>

//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Short Description *
//                       </label>
//                       <textarea
//                         required
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows="3"
//                         className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] transition-all resize-none"
//                       ></textarea>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Category *
//                       </label>
//                       <input
//                         required
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Brand *
//                       </label>
//                       <input
//                         required
//                         name="brand"
//                         value={formData.brand}
//                         onChange={handleChange}
//                         className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* PRICING & STOCK */}
//                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                   <h3 className="text-sm font-medium text-[#C8A253] mb-4 flex items-center gap-2">
//                     <IndianRupee className="w-4 h-4" />
//                     Pricing & Stock
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Base Price (₹)
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                           ₹
//                         </span>
//                         <input
//                           type="number"
//                           name="price"
//                           value={formData.price}
//                           onChange={handleChange}
//                           placeholder="Leave blank if none"
//                           className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Selling Price (₹)
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                           ₹
//                         </span>
//                         <input
//                           type="number"
//                           value={
//                             formData.price
//                               ? formData.price -
//                                 (formData.discountPrice || 0)
//                               : ''
//                           }
//                           placeholder="Leave blank if none"
//                           onChange={(e) => {
//                             const val = e.target.value;

//                             if (val === '') {
//                               setFormData({
//                                 ...formData,
//                                 discountPrice: 0
//                               });
//                             } else {
//                               const sellingPrice = Number(val);
//                               const basePrice =
//                                 Number(formData.price) || 0;
//                               const autoDiscount =
//                                 basePrice - sellingPrice;

//                               setFormData({
//                                 ...formData,
//                                 discountPrice:
//                                   autoDiscount > 0 ? autoDiscount : 0
//                               });
//                             }
//                           }}
//                           className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Calculated Discount: ₹
//                         {formData.discountPrice || 0}
//                       </p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Base Stock *
//                       </label>
//                       <input
//                         required
//                         type="text"
//                         name="stock"
//                         value={formData.stock}
//                         onChange={handleChange}
//                         placeholder="e.g. Available, Out of Stock"
//                         className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-4 pt-4 border-t border-gray-200">
//                     <label className="flex items-center gap-3 cursor-pointer group w-max">
//                       <div className="relative">
//                         <input
//                           type="checkbox"
//                           name="isActive"
//                           checked={formData.isActive}
//                           onChange={handleChange}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#C8A253] transition-colors"></div>
//                         <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
//                       </div>
//                       <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
//                         Product is{' '}
//                         {formData.isActive ? 'Active' : 'Hidden'}
//                       </span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* PREMIUM CONTENT: TECH SPECS & HIGHLIGHTS */}
//                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                   <h3 className="text-sm font-medium text-[#C8A253] mb-4 flex items-center gap-2">
//                     <ListChecks className="w-4 h-4" />
//                     Premium Content
//                   </h3>

//                   {/* Highlights */}
//                   <div className="mb-6">
//                     <div className="flex justify-between items-center mb-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         Quick Highlights (Icon & Title)
//                       </label>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           addArrayItem('highlights', {
//                             iconName: '',
//                             title: ''
//                           })
//                         }
//                         className="text-xs font-semibold text-[#C8A253] hover:text-[#b08d44]"
//                       >
//                         + Add Highlight
//                       </button>
//                     </div>

//                     <div className="mb-4 rounded-xl border border-[#C8A253]/30 bg-[#C8A253]/5 p-4">
//                       <label className="mb-2 block text-sm font-semibold text-gray-800">
//                         Paste All Highlights
//                       </label>

//                       <textarea
//                         value={bulkHighlightsText}
//                         onChange={e =>
//                           setBulkHighlightsText(e.target.value)
//                         }
//                         placeholder={
//                           'Coffee: Pure Titanium Construction\nFeather: Lightweight at 85 g'
//                         }
//                         rows={5}
//                         className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#C8A253]"
//                       />

//                       <p className="mt-2 text-xs text-gray-500">
//                         One IconName: Title per line. Existing filled rows
//                         will be kept.
//                       </p>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           applyBulkRows(
//                             'highlights',
//                             bulkHighlightsText,
//                             setBulkHighlightsText
//                           )
//                         }
//                         className="mt-3 rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
//                       >
//                         Apply Highlights
//                       </button>
//                     </div>

//                     {formData.highlights.map((h, i) => (
//                       <div key={i} className="flex gap-2 mb-2">
//                         <input
//                           placeholder="Icon (e.g. Battery)"
//                           value={h.iconName}
//                           onChange={(e) =>
//                             handleArrayChange(
//                               'highlights',
//                               i,
//                               'iconName',
//                               e.target.value
//                             )
//                           }
//                           className="w-1/3 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />

//                         <input
//                           placeholder="Title (e.g. 24-hour battery)"
//                           value={h.title}
//                           onChange={(e) =>
//                             handleArrayChange(
//                               'highlights',
//                               i,
//                               'title',
//                               e.target.value
//                             )
//                           }
//                           className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />

//                         <button
//                           type="button"
//                           onClick={() =>
//                             removeArrayItem('highlights', i)
//                           }
//                           className="p-2 bg-red-50 border border-red-100 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Promotional Video */}
//                   <div className="mb-6 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
//                     <label className="flex text-sm text-[#C8A253] font-medium mb-3 gap-2 items-center">
//                       <Video size={16} />
//                       Promotional Video
//                     </label>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <input
//                           placeholder="Video URL (e.g. https://... .webm or .mp4)"
//                           name="videoUrl"
//                           value={
//                             formData.promotionalVideo?.videoUrl || ''
//                           }
//                           onChange={handleVideoChange}
//                           className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">
//                           Direct link to your .mp4 or .webm file
//                         </p>
//                       </div>

//                       <div>
//                         <input
//                           placeholder="Thumbnail URL (Optional Image Link)"
//                           name="thumbnailUrl"
//                           value={
//                             formData.promotionalVideo?.thumbnailUrl ||
//                             ''
//                           }
//                           onChange={handleVideoChange}
//                           className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">
//                           Image to show before the video plays
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* TECH SPECS */}
//                   <div className="mb-6">
//                     <div className="flex justify-between items-center mb-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         Tech Specifications
//                       </label>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           addArrayItem('techSpecs', {
//                             category: '',
//                             description: '',
//                             details: []
//                           })
//                         }
//                         className="text-xs font-semibold text-[#C8A253] hover:text-[#b08d44]"
//                       >
//                         + Add Tech Spec
//                       </button>
//                     </div>

//                     <div className="mb-4 rounded-xl border border-[#C8A253]/30 bg-[#C8A253]/5 p-4">
//                       <label className="mb-2 block text-sm font-semibold text-gray-800">
//                         Paste All Specifications
//                       </label>

//                       <textarea
//                         value={bulkSpecsText}
//                         onChange={e =>
//                           setBulkSpecsText(e.target.value)
//                         }
//                         placeholder={
//                           'Material: Titanium\nCapacity: 220 ml\nWeight: 85 g'
//                         }
//                         rows={5}
//                         className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#C8A253]"
//                       />

//                       <p className="mt-2 text-xs text-gray-500">
//                         One Name: Value per line. Existing filled rows
//                         will be kept.
//                       </p>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           applyBulkRows(
//                             'techSpecs',
//                             bulkSpecsText,
//                             setBulkSpecsText
//                           )
//                         }
//                         className="mt-3 rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
//                       >
//                         Apply Specifications
//                       </button>
//                     </div>

//                     {formData.techSpecs.map((spec, i) => (
//                       <div key={i} className="flex gap-2 mb-2">
//                         <input
//                           placeholder="Category (e.g. Amplifiers)"
//                           value={spec.category}
//                           onChange={(e) =>
//                             handleArrayChange(
//                               'techSpecs',
//                               i,
//                               'category',
//                               e.target.value
//                             )
//                           }
//                           className="w-1/3 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />

//                         <input
//                           placeholder="Details (comma separated)"
//                           value={
//                             spec.details?.length > 0
//                               ? spec.details.join(', ')
//                               : spec.description || ''
//                           }
//                           onChange={(e) => {
//                             const val = e.target.value;
//                             const detailsArray = val
//                               .split(',')
//                               .map(item => item.trim())
//                               .filter(Boolean);

//                             const updated = [...formData.techSpecs];
//                             updated[i].description = val;
//                             updated[i].details = detailsArray;

//                             setFormData({
//                               ...formData,
//                               techSpecs: updated
//                             });
//                           }}
//                           className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />

//                         <button
//                           type="button"
//                           onClick={() =>
//                             removeArrayItem('techSpecs', i)
//                           }
//                           className="p-2 bg-red-50 border border-red-100 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* IN THE BOX */}
//                   <div>
//                     <div className="flex justify-between items-center mb-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         What's in the Box?
//                       </label>
//                       <button
//                         type="button"
//                         onClick={() => addArrayItem('inTheBox', '')}
//                         className="text-xs font-semibold text-[#C8A253] hover:text-[#b08d44]"
//                       >
//                         + Add Item
//                       </button>
//                     </div>

//                     {formData.inTheBox.map((item, i) => (
//                       <div key={i} className="flex gap-2 mb-2">
//                         <input
//                           placeholder="e.g. Charging Cable"
//                           value={item}
//                           onChange={(e) =>
//                             handleArrayChange(
//                               'inTheBox',
//                               i,
//                               null,
//                               e.target.value
//                             )
//                           }
//                           className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                         />

//                         <button
//                           type="button"
//                           onClick={() => removeArrayItem('inTheBox', i)}
//                           className="p-2 bg-red-50 border border-red-100 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* UNLIMITED LIFESTYLE BANNERS & EDITORIAL CONTENT */}
//                 <div className="bg-gray-50 rounded-xl p-5 border border-[#C8A253]/30 shadow-sm">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-sm font-medium text-[#C8A253] flex items-center gap-2">
//                       <LayoutTemplate className="w-4 h-4" />
//                       Lifestyle Banners & Editorial Content (Unlimited)
//                     </h3>

//                     <span className="text-xs font-medium text-[#C8A253] bg-[#C8A253]/10 px-2 py-1 rounded-md">
//                       {formData.lifestyleImages.length} Added
//                     </span>
//                   </div>

//                   <p className="text-xs text-gray-500 mb-4">
//                     Upload as many images as you want. Add Marshall-style
//                     titles & descriptions for side-by-side editorial layout.
//                   </p>

//                   <div className="space-y-4">
//                     {formData.lifestyleImages.map((imgObj, idx) => (
//                       <div
//                         key={idx}
//                         className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row gap-4 items-center shadow-sm"
//                       >
//                         <div className="relative group w-32 h-24 shrink-0 rounded-lg border border-gray-200 bg-gray-100 overflow-hidden">
//                           <img
//                             src={imgObj.url}
//                             alt={`Lifestyle ${idx + 1}`}
//                             className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
//                           />

//                           <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
//                             {idx + 1}
//                           </div>
//                         </div>

//                         {/* Title and Description Inputs */}
//                         <div className="flex-1 w-full space-y-2">
//                           <input
//                             type="text"
//                             placeholder="Heading (e.g. DUST AND WATERPROOF)"
//                             value={imgObj.title || ''}
//                             onChange={(e) =>
//                               handleLifestyleTextFieldChange(
//                                 idx,
//                                 'title',
//                                 e.target.value
//                               )
//                             }
//                             className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-xs focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                           />

//                           <textarea
//                             rows="2"
//                             placeholder="Description text (e.g. This speaker doesn't mind a swim...)"
//                             value={imgObj.description || ''}
//                             onChange={(e) =>
//                               handleLifestyleTextFieldChange(
//                                 idx,
//                                 'description',
//                                 e.target.value
//                               )
//                             }
//                             className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-xs focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] resize-none"
//                           />
//                         </div>

//                         {/* Controls */}
//                         <div className="flex md:flex-col gap-1 shrink-0">
//                           <button
//                             type="button"
//                             onClick={() => moveLifestyleImage(idx, -1)}
//                             className="p-1.5 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 text-gray-700 transition-colors"
//                           >
//                             <ChevronLeft size={14} />
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() => moveLifestyleImage(idx, 1)}
//                             className="p-1.5 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 text-gray-700 transition-colors"
//                           >
//                             <ChevronRight size={14} />
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() => removeLifestyleImage(idx)}
//                             className="p-1.5 bg-red-50 text-red-500 border border-red-100 rounded hover:bg-red-100 hover:text-red-700 transition-colors"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}

//                     <label className="w-full h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-white rounded-xl hover:border-[#C8A253] hover:bg-[#C8A253]/5 cursor-pointer transition-all group shadow-sm">
//                       <ImagePlus className="w-5 h-5 text-gray-400 mb-1 group-hover:text-[#C8A253]" />
//                       <span className="text-xs font-medium text-gray-500 group-hover:text-[#C8A253]">
//                         Add Unlimited Banners & Content
//                       </span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         className="hidden"
//                         onChange={handleLifestyleImageChange}
//                       />
//                     </label>
//                   </div>
//                 </div>

//                 {/* VARIANTS SECTION */}
//                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-sm font-medium text-[#C8A253] flex items-center gap-2">
//                       <Boxes className="w-4 h-4" />
//                       Product Variants
//                       <span className="text-xs text-gray-500 font-normal ml-1">
//                         (First image = main image)
//                       </span>
//                     </h3>

//                     <button
//                       type="button"
//                       onClick={addVariant}
//                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C8A253]/10 text-[#C8A253] font-medium text-sm hover:bg-[#C8A253]/20 transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add Variant
//                     </button>
//                   </div>

//                   {variants.length === 0 ? (
//                     <div className="text-center py-8 border-2 border-dashed border-gray-300 bg-white rounded-xl">
//                       <Boxes className="w-10 h-10 text-gray-400 mx-auto mb-2" />
//                       <p className="text-gray-500 text-sm font-medium">
//                         No variants added
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {variants.map((variant, idx) => (
//                         <div
//                           key={idx}
//                           className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
//                         >
//                          <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center gap-2">
//                               <span className="w-6 h-6 rounded-full bg-[#C8A253]/10 text-[#C8A253] text-xs flex items-center justify-center font-bold">
//                                 {idx + 1}
//                               </span>
//                               <span className="text-sm font-medium text-gray-900">
//                                 {variant.color
//                                   ? variant.color.trim()
//                                   : `Variant ${idx + 1}`}
//                               </span>
//                             </div>

//                             <button
//                               type="button"
//                               onClick={() => removeVariant(idx)}
//                               className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>

//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                             <div>
//                               <label className="block text-xs font-medium text-gray-600 mb-1">
//                                 Color
//                               </label>
//                               <input
//                                 value={variant.color}
//                                 onChange={(e) =>
//                                   handleVariantChange(
//                                     idx,
//                                     'color',
//                                     e.target.value
//                                   )
//                                 }
//                                 placeholder="e.g. Red"
//                                 className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                               />
//                             </div>

//                             <div>
//                               <label className="block text-xs font-medium text-gray-600 mb-1">
//                                 Stock
//                               </label>
//                               <input
//                                 type="text"
//                                 value={variant.stock}
//                                 onChange={(e) =>
//                                   handleVariantChange(
//                                     idx,
//                                     'stock',
//                                     e.target.value
//                                   )
//                                 }
//                                 placeholder="e.g. Available"
//                                 className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                               />
//                             </div>

//                             <div>
//                               <label className="block text-xs font-medium text-gray-600 mb-1">
//                                 Price (₹)
//                               </label>
//                               <input
//                                 type="number"
//                                 value={variant.price}
//                                 onChange={(e) =>
//                                   handleVariantChange(
//                                     idx,
//                                     'price',
//                                     e.target.value
//                                   )
//                                 }
//                                 placeholder="Optional"
//                                 className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
//                               />
//                             </div>
//                           </div>

//                           <div className="mt-3 pt-3 border-t border-gray-200">
//                             <div className="flex items-center justify-between mb-2">
//                               <label className="text-xs font-medium text-gray-600">
//                                 Images
//                               </label>

//                               <label className="cursor-pointer">
//                                 <input
//                                   type="file"
//                                   accept="image/*"
//                                   multiple
//                                   className="hidden"
//                                   onChange={(e) =>
//                                     e.target.files.length > 0 &&
//                                     handleVariantImageChange(
//                                       idx,
//                                       e.target.files
//                                     )
//                                   }
//                                 />
//                                 <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 bg-[#C8A253]/10 text-[#C8A253] rounded-lg hover:bg-[#C8A253]/20 transition-colors">
//                                   <ImagePlus className="w-3 h-3" />
//                                   Add
//                                 </span>
//                               </label>
//                             </div>

//                             <div className="flex flex-wrap gap-2">
//                               {variant.images?.map((imgObj, imgIdx) => (
//                                 <div
//                                   key={imgIdx}
//                                   className={`relative group p-1 bg-gray-50 rounded-lg border ${
//                                     imgObj.type === 'new'
//                                       ? 'border-[#C8A253]'
//                                       : 'border-gray-200'
//                                   }`}
//                                 >
//                                   <img
//                                     src={imgObj.url}
//                                     alt=""
//                                     className="w-16 h-16 object-cover rounded-lg border border-gray-200"
//                                   />

//                                   <div className="absolute top-0 right-0 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         moveImage(idx, imgIdx, -1)
//                                       }
//                                       className="bg-white/90 text-gray-700 rounded shadow-sm p-0.5 hover:bg-white hover:text-gray-900"
//                                     >
//                                       <ChevronLeft size={12} />
//                                     </button>

//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         moveImage(idx, imgIdx, 1)
//                                       }
//                                       className="bg-white/90 text-gray-700 rounded shadow-sm p-0.5 hover:bg-white hover:text-gray-900"
//                                     >
//                                       <ChevronRight size={12} />
//                                     </button>

//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         removeVariantImage(idx, imgIdx)
//                                       }
//                                       className="bg-red-50 text-red-600 rounded shadow-sm p-0.5 hover:bg-red-100 hover:text-red-700"
//                                     >
//                                       <X size={12} />
//                                     </button>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                   <p className="text-xs font-medium text-gray-500">
//                     * Required fields
//                   </p>

//                   <div className="flex gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setShowModal(false)}
//                       className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       type="submit"
//                       className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A253] to-[#b08d44] text-white font-semibold shadow-sm hover:shadow-lg hover:shadow-[#C8A253]/20 transition-all duration-300"
//                     >
//                       {editMode ? 'Update Product' : 'Save Product'}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/Toast';
import * as XLSX from 'xlsx';
import {
  Plus,
  Trash2,
  ImagePlus,
  Grid3X3,
  List,
  Search,
  Package,
  Edit2,
  X,
  ChevronDown,
  Tag,
  Boxes,
  IndianRupee,
  Star,
  Zap,
  Clock,
  Video,
  ListChecks,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  LayoutTemplate,
  Download
} from 'lucide-react';

const uniqueOptionNames = (values) => {
  const names = new Map();
  for (const value of values) {
    if (typeof value !== 'string' || !value.trim()) continue;
    const name = value.trim();
    const key = name.toLocaleLowerCase();
    if (!names.has(key)) names.set(key, name);
  }
  return [...names.values()];
};

const HEADER_MENU_GROUPS = [
  'SPEAKERS',
  'HEADPHONES',
  'EARPHONES',
  'SMARTWATCHES',
  'BEAUTY & WELLNESS',
  'HOME THEATER'
];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [brandDetails, setBrandDetails] = useState([]);
  const [archivedCategoryNames, setArchivedCategoryNames] = useState([]);
  const [archivedBrandNames, setArchivedBrandNames] = useState([]);
  const [newCategoryMenuGroup, setNewCategoryMenuGroup] = useState(HEADER_MENU_GROUPS[0]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [savingOption, setSavingOption] = useState(false);

  const [bulkSpecsText, setBulkSpecsText] = useState('');
  const [bulkHighlightsText, setBulkHighlightsText] = useState('');

  const applyBulkRows = (field, text, clearText) => {
    const lines = text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);

    if (!lines.length) {
      alert('Pehle data paste karo.');
      return;
    }

    const rows = [];

    for (let i = 0; i < lines.length; i++) {
      const splitAt = lines[i].indexOf(':');
      const key = lines[i].slice(0, splitAt).trim();
      const value = lines[i].slice(splitAt + 1).trim();

      if (splitAt <= 0 || !key || !value) {
        alert(`Line ${i + 1}: Name: Value format use karo.`);
        return;
      }

      rows.push(
        field === 'techSpecs'
          ? {
              category: key,
              description: value,
              details: [value]
            }
          : {
              iconName: key,
              title: value
            }
      );
    }

    setFormData(prev => ({
      ...prev,
      [field]: [
        ...(prev[field] || []).filter(row =>
          field === 'techSpecs'
            ? row.category?.trim() ||
              row.description?.trim() ||
              row.details?.length
            : row.iconName?.trim() || row.title?.trim()
        ),
        ...rows
      ]
    }));

    clearText('');
  };

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (type, message) => {
    setToastMessage({ type, message });
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: 0,
    category: '',
    brand: '',
    stock: 'Available',
    isActive: true,
    flashDeal: {
      isActive: false,
      dealPrice: '',
      startTime: '',
      endTime: ''
    },
    promotionalVideo: {
      videoUrl: '',
      thumbnailUrl: ''
    },
    inTheBox: [''],
    techSpecs: [],
    highlights: [],
    boughtTogether: [],
    lifestyleImages: []
  });

  // Variants state
  const [variants, setVariants] = useState([]);

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === 'all' || p.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = uniqueOptionNames(products.map(p => p.category));
  const productFormCategories = uniqueOptionNames([
    ...categoryOptions,
    ...products.map(product => product.category),
    ...(editMode && formData.category ? [formData.category] : [])
  ]).filter(category =>
    !archivedCategoryNames.includes(category.toLowerCase()) ||
    (editMode && category.toLowerCase() === String(formData.category || '').toLowerCase())
  );
  const productFormBrands = uniqueOptionNames([
    ...brandOptions,
    ...products.map(product => product.brand),
    ...(editMode && formData.brand ? [formData.brand] : [])
  ]).filter(brand =>
    !archivedBrandNames.includes(brand.toLowerCase()) ||
    (editMode && brand.toLowerCase() === String(formData.brand || '').toLowerCase())
  );

 const handleExportExcel = () => {
    const list = filteredProducts.length ? filteredProducts : products;
    if (!list.length) return;

    const rows = list.map((p, i) => {
      const remarks = [];

      const productImgCount = Array.isArray(p.images) ? p.images.length : 0;
      const variantList = Array.isArray(p.variants) ? p.variants : [];
      const variantImgCount = variantList.reduce(
        (sum, v) => sum + (Array.isArray(v?.images) ? v.images.length : 0),
        0
      );
      const totalImages = productImgCount + variantImgCount;

      if (!p.promotionalVideo?.videoUrl?.trim()) {
        remarks.push('No Video');
      }

      if (totalImages === 0) {
        remarks.push('No Images');
      } else if (totalImages < 2) {
        remarks.push(`Low Images (${totalImages})`);
      }

      if (
        p.price === undefined ||
        p.price === null ||
        p.price === '' ||
        Number(p.price) <= 0
      ) {
        remarks.push('No Price');
      }

      if (!variantList.length) {
        remarks.push('No Variants');
      } else if (variantList.some(v => !v?.color?.trim())) {
        remarks.push('Missing Color');
      }

      return {
        'S.No': i + 1,
        'Name': p.name || '',
        'Brand': p.brand || '',
        'Category': p.category || '',
        'Price': p.price ?? '',
        'Discount Price': p.discountPrice ?? '',
        'Stock': p.stock || '',
        'Active': p.isActive ? 'Yes' : 'No',
        'Images Count': totalImages,
        'Video': p.promotionalVideo?.videoUrl ? 'Yes' : 'No',
        'Remarks': remarks.length ? remarks.join(' | ') : 'Complete',
        'Description': String(p.description || '').replace(/<[^>]*>/g, ' ').trim(),
      };
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'products.xlsx');
  };
  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get('/products/admin/products');
      const loadedProducts = Array.isArray(data.products) ? data.products : [];
      setProducts(loadedProducts);
    } catch (error) {
      showToast(
        'error',
        error.response?.data?.message || 'Failed to load products'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchProductOptions = async () => {
    try {
      const { data } = await axiosInstance.get('/products/admin/options');
      setCategoryOptions(uniqueOptionNames(Array.isArray(data.categories) ? data.categories : []));
      setBrandOptions(uniqueOptionNames(Array.isArray(data.brands) ? data.brands : []));
      setCategoryDetails(Array.isArray(data.categoryDetails) ? data.categoryDetails : []);
      setBrandDetails(Array.isArray(data.brandDetails) ? data.brandDetails : []);
      setArchivedCategoryNames(Array.isArray(data.archivedCategories) ? data.archivedCategories : []);
      setArchivedBrandNames(Array.isArray(data.archivedBrands) ? data.archivedBrands : []);
    } catch (error) {
      showToast(
        'error',
        error.response?.data?.message || 'Failed to load categories and brands'
      );
    }
  };

  const handleAddProductOption = async (type) => {
    const rawValue = type === 'category' ? newCategory : newBrand;
    const value = rawValue.trim();

    if (!value) {
      showToast('error', `Enter a ${type} name first`);
      return;
    }

    setSavingOption(true);
    try {
      const { data } = await axiosInstance.post('/products/admin/options', {
        type,
        value,
        ...(type === 'category' ? { menuGroup: newCategoryMenuGroup } : {}),
      });
      const savedValue = data.option?.value || value;

      if (type === 'category') {
        setCategoryOptions(current => uniqueOptionNames([...current, savedValue]));
        setCategoryDetails(current => [
          ...current.filter(item => item.value.toLowerCase() !== savedValue.toLowerCase()),
          {
            id: data.option?.id,
            value: savedValue,
            menuGroup: data.option?.menuGroup || newCategoryMenuGroup,
          },
        ]);
        setArchivedCategoryNames(current => current.filter(name => name !== savedValue.toLowerCase()));
        setNewCategory('');
      } else {
        setBrandOptions(current => uniqueOptionNames([...current, savedValue]));
        setBrandDetails(current => [
          ...current.filter(item => item.value.toLowerCase() !== savedValue.toLowerCase()),
          { id: data.option?.id, value: savedValue },
        ]);
        setArchivedBrandNames(current => current.filter(name => name !== savedValue.toLowerCase()));
        setNewBrand('');
      }

      showToast(
        'success',
        data.alreadyExists ? `${type} already exists` : `${type} added successfully`
      );
    } catch (error) {
      showToast(
        'error',
        error.response?.data?.message || `Failed to add ${type}`
      );
    } finally {
      setSavingOption(false);
    }
  };

  const handleRemoveProductOption = async (option) => {
    if (!option?.id) return;
    const type = option.menuGroup ? 'category' : 'brand';
    const confirmed = window.confirm(
      `Remove "${option.value}" from the active ${type} lists? Existing products will keep their saved data.`
    );
    if (!confirmed) return;

    setSavingOption(true);
    try {
      await axiosInstance.delete(`/products/admin/options/${option.id}`);
      await fetchProductOptions();
      showToast('success', `${type} removed from the active lists`);
    } catch (error) {
      showToast(
        'error',
        error.response?.data?.message || `Failed to remove ${type}`
      );
    } finally {
      setSavingOption(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchProductOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFlashDealChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      flashDeal: {
        ...prev.flashDeal,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleVideoChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      promotionalVideo: {
        ...prev.promotionalVideo,
        [name]: value
      }
    }));
  };

  const handleArrayChange = (field, index, key, value) => {
    const updated = [...formData[field]];

    if (key === null) updated[index] = value;
    else updated[index][key] = value;

    setFormData({
      ...formData,
      [field]: updated
    });
  };

  const addArrayItem = (field, emptyItem) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], emptyItem]
    });
  };

  const removeArrayItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const handleLifestyleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map(f => ({
      type: 'new',
      file: f,
      url: URL.createObjectURL(f),
      title: '',
      description: ''
    }));

    setFormData(prev => ({
      ...prev,
      lifestyleImages: [...prev.lifestyleImages, ...newImages]
    }));
  };

  const handleLifestyleTextFieldChange = (index, field, value) => {
    const updated = [...formData.lifestyleImages];
    updated[index][field] = value;

    setFormData(prev => ({
      ...prev,
      lifestyleImages: updated
    }));
  };

  const removeLifestyleImage = (index) => {
    setFormData(prev => ({
      ...prev,
      lifestyleImages: prev.lifestyleImages.filter((_, i) => i !== index)
    }));
  };

  const moveLifestyleImage = (index, direction) => {
    const updated = [...formData.lifestyleImages];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= updated.length) return;

    [updated[index], updated[newIndex]] = [
      updated[newIndex],
      updated[index]
    ];

    setFormData(prev => ({
      ...prev,
      lifestyleImages: updated
    }));
  };

  // Variants Handlers
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        color: '',
        size: '',
        stock: 'Available',
        price: '',
        images: []
      }
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleVariantImageChange = (index, files) => {
    const updated = [...variants];

    const newFileObjects = Array.from(files).map(f => ({
      type: 'new',
      file: f,
      url: URL.createObjectURL(f)
    }));

    updated[index].images = [
      ...(updated[index].images || []),
      ...newFileObjects
    ];

    setVariants(updated);
  };

  const moveImage = (variantIndex, imageIndex, direction) => {
    const updated = [...variants];
    const imagesArray = updated[variantIndex].images;
    const newIndex = imageIndex + direction;

    if (newIndex < 0 || newIndex >= imagesArray.length) return;

    [imagesArray[imageIndex], imagesArray[newIndex]] = [
      imagesArray[newIndex],
      imagesArray[imageIndex]
    ];

    setVariants(updated);
  };

  const removeVariantImage = (variantIndex, imageIndex) => {
    const updated = [...variants];

    updated[variantIndex].images = updated[variantIndex].images.filter(
      (_, i) => i !== imageIndex
    );

    setVariants(updated);
  };

  const handleOpenModal = async (product = null) => {
    setBulkSpecsText('');
    setBulkHighlightsText('');
    setVariants([]);

    if (product) {
      setEditMode(true);
      setCurrentId(product._id);

      try {
        const { data } = await axiosInstance.get(`/products/${product._id}`);
        const fullProd = data.product;

        const formatDateTime = (dateString) =>
          dateString
            ? new Date(dateString).toISOString().slice(0, 16)
            : '';

        setFormData({
          name: fullProd.name,
          description: fullProd.description,
          price: fullProd.price || '',
          discountPrice: fullProd.discountPrice || 0,
          category: fullProd.category,
          brand: fullProd.brand,
          stock: fullProd.stock,
          isActive: fullProd.isActive,
          flashDeal: {
            isActive: fullProd.flashDeal?.isActive || false,
            dealPrice: fullProd.flashDeal?.dealPrice || '',
            startTime: formatDateTime(fullProd.flashDeal?.startTime),
            endTime: formatDateTime(fullProd.flashDeal?.endTime)
          },
          promotionalVideo: fullProd.promotionalVideo || {
            videoUrl: '',
            thumbnailUrl: ''
          },
          inTheBox: fullProd.inTheBox?.length ? fullProd.inTheBox : [''],
          techSpecs: fullProd.techSpecs?.map(t => ({
            category: t.category || '',
            description: t.description || '',
            details: t.details || []
          })) || [],
          highlights: fullProd.highlights || [],
          boughtTogether: fullProd.boughtTogether
            ? fullProd.boughtTogether.map(item => item._id || item)
            : [],
          lifestyleImages: fullProd.lifestyleImages
            ? fullProd.lifestyleImages.map(item => ({
                type: 'existing',
                data: item,
                url: item.image?.url || item.url || item,
                title: item.title || '',
                description: item.description || ''
              }))
            : []
        });

        if (fullProd.variants?.length > 0) {
          setVariants(
            fullProd.variants.map(v => ({
              color: v.color || '',
              size: v.size || '',
              stock: v.stock || '',
              price: v.price || '',
              images: v.images
                ? v.images.map(img => ({
                    type: 'existing',
                    data: img,
                    url: img.url
                  }))
                : []
            }))
          );
        }
      } catch (e) {
        showToast('error', 'Failed to fetch full details');
      }
    } else {
      setEditMode(false);
      setCurrentId(null);

      setFormData({
        name: '',
        description: '',
        price: '',
        discountPrice: 0,
        category: '',
        brand: '',
        stock: 'Available',
        isActive: true,
        flashDeal: {
          isActive: false,
          dealPrice: '',
          startTime: '',
          endTime: ''
        },
        promotionalVideo: {
          videoUrl: '',
          thumbnailUrl: ''
        },
        inTheBox: [''],
        techSpecs: [],
        highlights: [],
        boughtTogether: [],
        lifestyleImages: []
      });
    }

    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();

      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('discountPrice', formData.discountPrice);
      submitData.append('category', formData.category);
      submitData.append('brand', formData.brand);
      submitData.append('stock', formData.stock);
      submitData.append('isActive', formData.isActive);

      submitData.append('flashDeal', JSON.stringify(formData.flashDeal));
      submitData.append(
        'promotionalVideo',
        JSON.stringify(formData.promotionalVideo)
      );

      submitData.append(
        'inTheBox',
        JSON.stringify(formData.inTheBox.filter(i => i.trim() !== ''))
      );

      submitData.append(
        'techSpecs',
        JSON.stringify(
          formData.techSpecs.filter(t => t.category.trim() !== '')
        )
      );

      submitData.append(
        'highlights',
        JSON.stringify(
          formData.highlights.filter(h => h.title.trim() !== '')
        )
      );

      let cleanBoughtTogether = [];

      if (Array.isArray(formData.boughtTogether)) {
        cleanBoughtTogether = formData.boughtTogether.filter(
          id => typeof id === 'string' && id.length === 24
        );
      }

      submitData.append(
        'boughtTogether',
        cleanBoughtTogether.length > 0
          ? JSON.stringify(cleanBoughtTogether)
          : ''
      );

      const lifestyleMeta = formData.lifestyleImages.map((imgObj) => ({
        type: imgObj.type,
        existingData: imgObj.type === 'existing' ? imgObj.data : null,
        title: imgObj.title || '',
        description: imgObj.description || ''
      }));

      submitData.append(
        'lifestyleMetadata',
        JSON.stringify(lifestyleMeta)
      );

      formData.lifestyleImages
        .filter(img => img.type === 'new')
        .forEach((imgObj) => {
          submitData.append('lifestyleImages', imgObj.file);
        });

      // Handle Variants
      const variantsData = variants.map((v) => {
        const existingImgs = v.images
          .filter(img => img.type === 'existing')
          .map(img => img.data);

        const newImgs = v.images.filter(img => img.type === 'new');

        return {
          color: v.color,
          size: v.size,
          stock: v.stock,
          price: v.price,
          existingImages: existingImgs || [],
          hasNewImages: newImgs.length > 0
        };
      });

      submitData.append('variants', JSON.stringify(variantsData));

      let fileCount = 0;

      variants.forEach((v, variantIdx) => {
        const newFiles = v.images.filter(img => img.type === 'new');

        if (newFiles.length > 0) {
          newFiles.forEach((imgObj, imgIdx) => {
            submitData.append(
              `variantImages_${variantIdx}_${imgIdx}`,
              imgObj.file
            );
            fileCount++;
          });
        }
      });

      const config = { headers: {} };

      if (editMode) {
        await axiosInstance.put(
          `/products/admin/product/${currentId}`,
          submitData,
          config
        );

        showToast('success', 'Product updated successfully');
      } else {
        await axiosInstance.post(
          '/products/admin/product/new',
          submitData,
          config
        );

        showToast('success', 'Product created successfully');
      }

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Upload Error:', error);

      showToast(
        'error',
        error.response?.data?.message || 'Action failed. Check console.'
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosInstance.delete(`/products/admin/product/${id}`);
        showToast('success', 'Product deleted');
        fetchProducts();
      } catch (error) {
        showToast(
          'error',
          error.response?.data?.message || 'Delete failed'
        );
      }
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const { data } = await axiosInstance.patch(
        `/products/admin/product/${id}/feature`
      );

      setProducts(
        products.map(p =>
          p._id === id ? { ...p, isFeatured: data.isFeatured } : p
        )
      );

      showToast('success', data.message);
    } catch (error) {
      showToast(
        'error',
        error.response?.data?.message ||
          'Failed to update featured status'
      );
    }
  };

  return (
    <div className="p-6 space-y-6 bg-[#f8f9fa] min-h-screen">
      <Toast
        toast={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#C8A253] flex items-center gap-3">
            <Package className="w-8 h-8" />
            Product Inventory
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your products, variants, and deals
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setShowOptionsModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#C8A253] text-[#9b762d] bg-white font-semibold hover:bg-[#C8A253]/5 transition-colors"
          >
            <Tag className="w-5 h-5" />
            Manage Categories & Brands
          </button>
          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A253] to-[#b08d44] text-white font-semibold hover:shadow-lg hover:shadow-[#C8A253]/20 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white shadow-sm rounded-xl border border-gray-200 p-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search products by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] cursor-pointer w-full"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={handleExportExcel}
            title="Export to Excel"
            className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:border-[#C8A253] hover:text-[#C8A253] transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#C8A253] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#C8A253] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#C8A253]">Loading inventory...</p>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {searchTerm || filterCategory !== 'all'
              ? 'No products match your search criteria'
              : 'No products found. Start by adding a new product!'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:border-[#C8A253]/50 hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden border-b border-gray-100">
                {p.images?.[0]?.url ? (
                  <img
                    src={p.images[0].url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : p.variants?.[0]?.images?.[0]?.url ? (
                  <img
                    src={p.variants[0].images[0].url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImagePlus className="w-12 h-12 text-gray-300" />
                  </div>
                )}

                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.isActive
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}
                  >
                    {p.isActive ? 'Active' : 'Hidden'}
                  </div>

                  {p.isFeatured && (
                    <div className="px-2 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-[#C8A253] text-white flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </div>
                  )}

                  {p.flashDeal?.isActive && (
                    <div className="px-2 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-red-500 text-white flex items-center gap-1 shadow-sm">
                      <Zap className="w-3 h-3 fill-current" />
                      Deal On
                    </div>
                  )}
                </div>

                {p.discountPrice > 0 && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-[#C8A253] text-white shadow-sm">
                    {Math.round((p.discountPrice / p.price) * 100)}% OFF
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500">{p.brand}</p>
                  </div>

                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600 border border-gray-200">
                    {p.category}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-[#C8A253]">
                    {p.price
                      ? `₹${
                          p.discountPrice > 0
                            ? p.price - p.discountPrice
                            : p.price
                        }`
                      : 'Price on Request'}
                  </span>

                  {p.discountPrice > 0 && p.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{p.price}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleToggleFeatured(p._id)}
                    className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-colors border ${
                      p.isFeatured
                        ? 'bg-[#C8A253]/10 text-[#C8A253] border-[#C8A253]/30'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        p.isFeatured ? 'fill-[#C8A253]' : ''
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => handleOpenModal(p)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Deal Status</th>
                <th className="px-6 py-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.images?.[0]?.url ? (
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        />
                      ) : p.variants?.[0]?.images?.[0]?.url ? (
                        <img
                          src={p.variants[0].images[0].url}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                          <ImagePlus className="w-5 h-5 text-gray-400" />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">
                            {p.name}
                          </p>
                          {p.isFeatured && (
                            <Star className="w-3 h-3 text-[#C8A253] fill-[#C8A253]" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{p.brand}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600">
                      {p.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-[#C8A253] font-semibold">
                      {p.price
                        ? `₹${
                            p.discountPrice > 0
                              ? p.price - p.discountPrice
                              : p.price
                          }`
                        : 'On Request'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {p.flashDeal?.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-200">
                        <Zap className="w-3 h-3 fill-current" />
                        Active Deal
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleFeatured(p._id)}
                        className={`p-2 rounded-lg transition-colors border ${
                          p.isFeatured
                            ? 'bg-[#C8A253]/10 text-[#C8A253] border-[#C8A253]/30'
                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            p.isFeatured ? 'fill-[#C8A253]' : ''
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => handleOpenModal(p)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#C8A253]/10">
                  <Package className="w-5 h-5 text-[#C8A253]" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-[#C8A253]">
                    {editMode ? 'Edit Product' : 'Add New Product'}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* BASIC INFO */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="text-sm font-medium text-[#C8A253] mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Product Name *
                      </label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Short Description *
                      </label>
                      <textarea
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] transition-all resize-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category *
                      </label>
                      <select
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                      >
                        <option value="">Select category</option>
                        {productFormCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Brand *
                      </label>
                      <select
                        required
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                      >
                        <option value="">Select brand</option>
                        {productFormBrands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* PRICING & STOCK */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="text-sm font-medium text-[#C8A253] mb-4 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" />
                    Pricing & Stock
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Base Price (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="Leave blank if none"
                          className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Selling Price (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={
                            formData.price
                              ? formData.price -
                                (formData.discountPrice || 0)
                              : ''
                          }
                          placeholder="Leave blank if none"
                          onChange={(e) => {
                            const val = e.target.value;

                            if (val === '') {
                              setFormData({
                                ...formData,
                                discountPrice: 0
                              });
                            } else {
                              const sellingPrice = Number(val);
                              const basePrice =
                                Number(formData.price) || 0;
                              const autoDiscount =
                                basePrice - sellingPrice;

                              setFormData({
                                ...formData,
                                discountPrice:
                                  autoDiscount > 0 ? autoDiscount : 0
                              });
                            }
                          }}
                          className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Calculated Discount: ₹
                        {formData.discountPrice || 0}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Base Stock *
                      </label>
                      <input
                        required
                        type="text"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="e.g. Available, Out of Stock"
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer group w-max">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#C8A253] transition-colors"></div>
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        Product is{' '}
                        {formData.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* PREMIUM CONTENT: TECH SPECS & HIGHLIGHTS */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="text-sm font-medium text-[#C8A253] mb-4 flex items-center gap-2">
                    <ListChecks className="w-4 h-4" />
                    Premium Content
                  </h3>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Quick Highlights (Icon & Title)
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          addArrayItem('highlights', {
                            iconName: '',
                            title: ''
                          })
                        }
                        className="text-xs font-semibold text-[#C8A253] hover:text-[#b08d44]"
                      >
                        + Add Highlight
                      </button>
                    </div>

                    <div className="mb-4 rounded-xl border border-[#C8A253]/30 bg-[#C8A253]/5 p-4">
                      <label className="mb-2 block text-sm font-semibold text-gray-800">
                        Paste All Highlights
                      </label>

                      <textarea
                        value={bulkHighlightsText}
                        onChange={e =>
                          setBulkHighlightsText(e.target.value)
                        }
                        placeholder={
                          'Coffee: Pure Titanium Construction\nFeather: Lightweight at 85 g'
                        }
                        rows={5}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#C8A253]"
                      />

                      <p className="mt-2 text-xs text-gray-500">
                        One IconName: Title per line. Existing filled rows
                        will be kept.
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          applyBulkRows(
                            'highlights',
                            bulkHighlightsText,
                            setBulkHighlightsText
                          )
                        }
                        className="mt-3 rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                      >
                        Apply Highlights
                      </button>
                    </div>

                    {formData.highlights.map((h, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          placeholder="Icon (e.g. Battery)"
                          value={h.iconName}
                          onChange={(e) =>
                            handleArrayChange(
                              'highlights',
                              i,
                              'iconName',
                              e.target.value
                            )
                          }
                          className="w-1/3 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />

                        <input
                          placeholder="Title (e.g. 24-hour battery)"
                          value={h.title}
                          onChange={(e) =>
                            handleArrayChange(
                              'highlights',
                              i,
                              'title',
                              e.target.value
                            )
                          }
                          className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem('highlights', i)
                          }
                          className="p-2 bg-red-50 border border-red-100 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Promotional Video */}
                  <div className="mb-6 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                    <label className="flex text-sm text-[#C8A253] font-medium mb-3 gap-2 items-center">
                      <Video size={16} />
                      Promotional Video
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          placeholder="Video URL (e.g. https://... .webm or .mp4)"
                          name="videoUrl"
                          value={
                            formData.promotionalVideo?.videoUrl || ''
                          }
                          onChange={handleVideoChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Direct link to your .mp4 or .webm file
                        </p>
                      </div>

                      <div>
                        <input
                          placeholder="Thumbnail URL (Optional Image Link)"
                          name="thumbnailUrl"
                          value={
                            formData.promotionalVideo?.thumbnailUrl ||
                            ''
                          }
                          onChange={handleVideoChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Image to show before the video plays
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* TECH SPECS */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Tech Specifications
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          addArrayItem('techSpecs', {
                            category: '',
                            description: '',
                            details: []
                          })
                        }
                        className="text-xs font-semibold text-[#C8A253] hover:text-[#b08d44]"
                      >
                        + Add Tech Spec
                      </button>
                    </div>

                    <div className="mb-4 rounded-xl border border-[#C8A253]/30 bg-[#C8A253]/5 p-4">
                      <label className="mb-2 block text-sm font-semibold text-gray-800">
                        Paste All Specifications
                      </label>

                      <textarea
                        value={bulkSpecsText}
                        onChange={e =>
                          setBulkSpecsText(e.target.value)
                        }
                        placeholder={
                          'Material: Titanium\nCapacity: 220 ml\nWeight: 85 g'
                        }
                        rows={5}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#C8A253]"
                      />

                      <p className="mt-2 text-xs text-gray-500">
                        One Name: Value per line. Existing filled rows
                        will be kept.
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          applyBulkRows(
                            'techSpecs',
                            bulkSpecsText,
                            setBulkSpecsText
                          )
                        }
                        className="mt-3 rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                      >
                        Apply Specifications
                      </button>
                    </div>

                    {formData.techSpecs.map((spec, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          placeholder="Category (e.g. Amplifiers)"
                          value={spec.category}
                          onChange={(e) =>
                            handleArrayChange(
                              'techSpecs',
                              i,
                              'category',
                              e.target.value
                            )
                          }
                          className="w-1/3 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />

                        <input
                          placeholder="Details (comma separated)"
                          value={
                            spec.details?.length > 0
                              ? spec.details.join(', ')
                              : spec.description || ''
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            const detailsArray = val
                              .split(',')
                              .map(item => item.trim())
                              .filter(Boolean);

                            const updated = [...formData.techSpecs];
                            updated[i].description = val;
                            updated[i].details = detailsArray;

                            setFormData({
                              ...formData,
                              techSpecs: updated
                            });
                          }}
                          className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem('techSpecs', i)
                          }
                          className="p-2 bg-red-50 border border-red-100 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* IN THE BOX */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        What's in the Box?
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('inTheBox', '')}
                        className="text-xs font-semibold text-[#C8A253] hover:text-[#b08d44]"
                      >
                        + Add Item
                      </button>
                    </div>

                    {formData.inTheBox.map((item, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          placeholder="e.g. Charging Cable"
                          value={item}
                          onChange={(e) =>
                            handleArrayChange(
                              'inTheBox',
                              i,
                              null,
                              e.target.value
                            )
                          }
                          className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                        />

                        <button
                          type="button"
                          onClick={() => removeArrayItem('inTheBox', i)}
                          className="p-2 bg-red-50 border border-red-100 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* UNLIMITED LIFESTYLE BANNERS & EDITORIAL CONTENT */}
                <div className="bg-gray-50 rounded-xl p-5 border border-[#C8A253]/30 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#C8A253] flex items-center gap-2">
                      <LayoutTemplate className="w-4 h-4" />
                      Lifestyle Banners & Editorial Content (Unlimited)
                    </h3>

                    <span className="text-xs font-medium text-[#C8A253] bg-[#C8A253]/10 px-2 py-1 rounded-md">
                      {formData.lifestyleImages.length} Added
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    Upload as many images as you want. Add Marshall-style
                    titles & descriptions for side-by-side editorial layout.
                  </p>

                  <div className="space-y-4">
                    {formData.lifestyleImages.map((imgObj, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row gap-4 items-center shadow-sm"
                      >
                        <div className="relative group w-32 h-24 shrink-0 rounded-lg border border-gray-200 bg-gray-100 overflow-hidden">
                          <img
                            src={imgObj.url}
                            alt={`Lifestyle ${idx + 1}`}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />

                          <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
                            {idx + 1}
                          </div>
                        </div>

                        {/* Title and Description Inputs */}
                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            placeholder="Heading (e.g. DUST AND WATERPROOF)"
                            value={imgObj.title || ''}
                            onChange={(e) =>
                              handleLifestyleTextFieldChange(
                                idx,
                                'title',
                                e.target.value
                              )
                            }
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-xs focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                          />

                          <textarea
                            rows="2"
                            placeholder="Description text (e.g. This speaker doesn't mind a swim...)"
                            value={imgObj.description || ''}
                            onChange={(e) =>
                              handleLifestyleTextFieldChange(
                                idx,
                                'description',
                                e.target.value
                              )
                            }
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-xs focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] resize-none"
                          />
                        </div>

                        {/* Controls */}
                        <div className="flex md:flex-col gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => moveLifestyleImage(idx, -1)}
                            className="p-1.5 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          >
                            <ChevronLeft size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => moveLifestyleImage(idx, 1)}
                            className="p-1.5 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          >
                            <ChevronRight size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => removeLifestyleImage(idx)}
                            className="p-1.5 bg-red-50 text-red-500 border border-red-100 rounded hover:bg-red-100 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <label className="w-full h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-white rounded-xl hover:border-[#C8A253] hover:bg-[#C8A253]/5 cursor-pointer transition-all group shadow-sm">
                      <ImagePlus className="w-5 h-5 text-gray-400 mb-1 group-hover:text-[#C8A253]" />
                      <span className="text-xs font-medium text-gray-500 group-hover:text-[#C8A253]">
                        Add Unlimited Banners & Content
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleLifestyleImageChange}
                      />
                    </label>
                  </div>
                </div>

                {/* VARIANTS SECTION */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-[#C8A253] flex items-center gap-2">
                      <Boxes className="w-4 h-4" />
                      Product Variants
                      <span className="text-xs text-gray-500 font-normal ml-1">
                        (First image = main image)
                      </span>
                    </h3>

                    <button
                      type="button"
                      onClick={addVariant}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C8A253]/10 text-[#C8A253] font-medium text-sm hover:bg-[#C8A253]/20 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Variant
                    </button>
                  </div>

                  {variants.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 bg-white rounded-xl">
                      <Boxes className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm font-medium">
                        No variants added
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {variants.map((variant, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
                        >
                         <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#C8A253]/10 text-[#C8A253] text-xs flex items-center justify-center font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {variant.color
                                  ? variant.color.trim()
                                  : `Variant ${idx + 1}`}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeVariant(idx)}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Color
                              </label>
                              <input
                                value={variant.color}
                                onChange={(e) =>
                                  handleVariantChange(
                                    idx,
                                    'color',
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. Red"
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Stock
                              </label>
                              <input
                                type="text"
                                value={variant.stock}
                                onChange={(e) =>
                                  handleVariantChange(
                                    idx,
                                    'stock',
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. Available"
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Price (₹)
                              </label>
                              <input
                                type="number"
                                value={variant.price}
                                onChange={(e) =>
                                  handleVariantChange(
                                    idx,
                                    'price',
                                    e.target.value
                                  )
                                }
                                placeholder="Optional"
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253]"
                              />
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs font-medium text-gray-600">
                                Images
                              </label>

                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={(e) =>
                                    e.target.files.length > 0 &&
                                    handleVariantImageChange(
                                      idx,
                                      e.target.files
                                    )
                                  }
                                />
                                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 bg-[#C8A253]/10 text-[#C8A253] rounded-lg hover:bg-[#C8A253]/20 transition-colors">
                                  <ImagePlus className="w-3 h-3" />
                                  Add
                                </span>
                              </label>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {variant.images?.map((imgObj, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  className={`relative group p-1 bg-gray-50 rounded-lg border ${
                                    imgObj.type === 'new'
                                      ? 'border-[#C8A253]'
                                      : 'border-gray-200'
                                  }`}
                                >
                                  <img
                                    src={imgObj.url}
                                    alt=""
                                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                  />

                                  <div className="absolute top-0 right-0 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        moveImage(idx, imgIdx, -1)
                                      }
                                      className="bg-white/90 text-gray-700 rounded shadow-sm p-0.5 hover:bg-white hover:text-gray-900"
                                    >
                                      <ChevronLeft size={12} />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        moveImage(idx, imgIdx, 1)
                                      }
                                      className="bg-white/90 text-gray-700 rounded shadow-sm p-0.5 hover:bg-white hover:text-gray-900"
                                    >
                                      <ChevronRight size={12} />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeVariantImage(idx, imgIdx)
                                      }
                                      className="bg-red-50 text-red-600 rounded shadow-sm p-0.5 hover:bg-red-100 hover:text-red-700"
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500">
                    * Required fields
                  </p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A253] to-[#b08d44] text-white font-semibold shadow-sm hover:shadow-lg hover:shadow-[#C8A253]/20 transition-all duration-300"
                    >
                      {editMode ? 'Update Product' : 'Save Product'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY AND BRAND MANAGEMENT */}
      {showOptionsModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div>
                <h2 className="text-xl font-semibold text-[#9b762d]">Manage Categories & Brands</h2>
                <p className="text-sm text-gray-500 mt-1">Category choose karte waqt header menu select karo. Brands automatically Brands menu mein jayenge.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowOptionsModal(false)}
                className="p-2 rounded-lg hover:bg-gray-200 text-gray-500"
                aria-label="Close category and brand manager"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
              <section className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                <form
                  className="space-y-2"
                  onSubmit={event => {
                    event.preventDefault();
                    handleAddProductOption('category');
                  }}
                >
                  <input
                    value={newCategory}
                    onChange={event => setNewCategory(event.target.value)}
                    maxLength={80}
                    placeholder="Enter category name"
                    className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-[#C8A253]"
                  />
                  <select
                    value={newCategoryMenuGroup}
                    onChange={event => setNewCategoryMenuGroup(event.target.value)}
                    aria-label="Choose the header menu for this category"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-[#C8A253]"
                  >
                    {HEADER_MENU_GROUPS.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={savingOption}
                    className="rounded-lg bg-[#C8A253] px-4 py-2.5 font-semibold text-white disabled:opacity-60"
                  >Add Category</button>
                </form>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categoryOptions.length ? categoryOptions.map(categoryName => {
                    const category = categoryDetails.find(
                      item => item.value.toLowerCase() === categoryName.toLowerCase()
                    );

                    return (
                      <span key={categoryName} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                        <span>
                          {categoryName}
                          {category?.menuGroup && (
                            <span className="text-xs text-gray-500"> → {category.menuGroup}</span>
                          )}
                        </span>
                        {category?.id && (
                          <button
                            type="button"
                            disabled={savingOption}
                            onClick={() => handleRemoveProductOption(category)}
                            aria-label={`Remove category ${categoryName}`}
                            title="Remove category"
                            className="text-gray-500 hover:text-red-600 disabled:opacity-40"
                          ><Trash2 size={14} /></button>
                        )}
                      </span>
                    );
                  }) : <span className="text-sm text-gray-500">No categories yet</span>}
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-800 mb-3">Brands</h3>
                <form
                  className="flex gap-2"
                  onSubmit={event => {
                    event.preventDefault();
                    handleAddProductOption('brand');
                  }}
                >
                  <input
                    value={newBrand}
                    onChange={event => setNewBrand(event.target.value)}
                    maxLength={80}
                    placeholder="Enter brand name"
                    className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-[#C8A253]"
                  />
                  <button
                    type="submit"
                    disabled={savingOption}
                    className="rounded-lg bg-[#C8A253] px-4 py-2.5 font-semibold text-white disabled:opacity-60"
                  >Add</button>
                </form>
                <div className="mt-4 flex flex-wrap gap-2">
                  {brandOptions.length ? brandOptions.map(brandName => {
                    const brand = brandDetails.find(
                      item => item.value.toLowerCase() === brandName.toLowerCase()
                    );

                    return (
                      <span key={brandName} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                        <span>{brandName}</span>
                        {brand?.id && (
                          <button
                            type="button"
                            disabled={savingOption}
                            onClick={() => handleRemoveProductOption(brand)}
                            aria-label={`Remove brand ${brandName}`}
                            title="Remove brand"
                            className="text-gray-500 hover:text-red-600 disabled:opacity-40"
                          ><Trash2 size={14} /></button>
                        )}
                      </span>
                    );
                  }) : <span className="text-sm text-gray-500">No brands yet</span>}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
